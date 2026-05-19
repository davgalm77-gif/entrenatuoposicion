using Microsoft.AspNetCore.Mvc;
using EntrenaTuOposicionAPI.Data;
using EntrenaTuOposicionAPI.DTOs;
using EntrenaTuOposicionAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Google.Apis.Auth;

namespace EntrenaTuOposicionAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    private readonly IConfiguration _configuration;

    public AuthController(
    AppDbContext context,
    IConfiguration configuration
)
{
    _context = context;

    _configuration = configuration;
}

    [HttpPost("register")]
    public IActionResult Register(
        RegisterRequest request
    )
    {
        var usuario = new Usuario
        {
            Username = request.Username,

            Email = request.Email,

            PasswordHash =
    BCrypt.Net.BCrypt.HashPassword(
        request.Password
    ),

            Creditos = 5
        };

        _context.Usuarios.Add(usuario);

        _context.SaveChanges();

        return Ok(
            "Usuario registrado"
        );
    }

    [HttpPost("login")]
public IActionResult Login(
    LoginRequest request
)
{
    var usuario = _context.Usuarios
        .FirstOrDefault(
            u => u.Email == request.Email
        );

    if (usuario == null)
    {
        return BadRequest(new
{
    message = "Correo incorrecto"
});
    }

    var passwordCorrecta =
        BCrypt.Net.BCrypt.Verify(
            request.Password,
            usuario.PasswordHash
        );

    if (!passwordCorrecta)
    {
       return BadRequest(new
{
    message = "Contraseña incorrecta"
});
    }

    var claims = new[]
{
    new Claim(
        ClaimTypes.NameIdentifier,
        usuario.Id.ToString()
    ),

    new Claim(
        ClaimTypes.Email,
        usuario.Email
    ),

    new Claim(
        ClaimTypes.Role,
        usuario.EsAdmin
            ? "Admin"
            : "User"
    )
};

var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(
        _configuration["Jwt:Key"]!
    )
);

var creds = new SigningCredentials(
    key,
    SecurityAlgorithms.HmacSha256
);

var token = new JwtSecurityToken(
    issuer:
        _configuration["Jwt:Issuer"],

    audience:
        _configuration["Jwt:Audience"],

    claims: claims,

    expires:
        DateTime.UtcNow.AddDays(7),

    signingCredentials: creds
);

var jwt = new JwtSecurityTokenHandler()
    .WriteToken(token);

return Ok(new
{
    token = jwt
});
    
}

[HttpPost("google-login")]
public async Task<IActionResult>
GoogleLogin(
    GoogleLoginRequest request
)
{
    var payload =
        await GoogleJsonWebSignature
            .ValidateAsync(
                request.Credential
            );

            

    var usuario = _context.Usuarios
        .FirstOrDefault(
            u => u.Email == payload.Email
        );

    if (usuario == null)
    {
        usuario = new Usuario
        {
            Email = payload.Email,

            Username =
                payload.Name,

                FotoPerfil =
            payload.Picture,

            PasswordHash = "",

            Creditos = 5
        };

        _context.Usuarios.Add(usuario);

        _context.SaveChanges();
        
    }

    var claims = new[]
    {
        new Claim(
            ClaimTypes.NameIdentifier,
            usuario.Id.ToString()
        ),

        new Claim(
            ClaimTypes.Email,
            usuario.Email
        )
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(
            _configuration["Jwt:Key"]!
        )
    );

    var creds = new SigningCredentials(
        key,
        SecurityAlgorithms.HmacSha256
    );

    var token = new JwtSecurityToken(
        issuer:
            _configuration["Jwt:Issuer"],

        audience:
            _configuration["Jwt:Audience"],

        claims: claims,

        expires:
            DateTime.UtcNow.AddDays(7),

        signingCredentials: creds
    );

    var jwt = new JwtSecurityTokenHandler()
        .WriteToken(token);

    return Ok(new
    {
        token = jwt
    });
}

[Authorize]
[HttpPost("oposiciones")]
public IActionResult CrearOposicion(
    CrearOposicionRequest request
)
{
    var id = User.FindFirst(
        ClaimTypes.NameIdentifier
    )?.Value;

    if (id == null)
    {
        return Unauthorized();
    }

    var usuario = _context.Usuarios
        .FirstOrDefault(
            u => u.Id == int.Parse(id)
        );

    if (usuario == null)
    {
        return NotFound();
    }

    var oposicion = new Oposicion
    {
        Nombre = request.Nombre,

        UsuarioId = usuario.Id
    };

    _context.Oposiciones.Add(
        oposicion
    );

    _context.SaveChanges();

    usuario.OposicionActivaId =
        oposicion.Id;

    _context.SaveChanges();

    return Ok(new
{
    oposicion.Id,
    oposicion.Nombre
});
}

[Authorize]
[HttpPost("seleccionar-oposicion/{id}")]
public IActionResult
SeleccionarOposicion(
    int id
)
{
    var userId = User.FindFirst(
        ClaimTypes.NameIdentifier
    )?.Value;

    if (userId == null)
    {
        return Unauthorized();
    }

    var usuario = _context.Usuarios
        .FirstOrDefault(
            u => u.Id == int.Parse(userId)
        );

    if (usuario == null)
    {
        return NotFound();
    }

    usuario.OposicionActivaId = id;

    _context.SaveChanges();

    return Ok();
}

[Authorize]
[HttpGet("me")]
public IActionResult Me()
{
    var id = User.FindFirst(
        ClaimTypes.NameIdentifier
    )?.Value;

    if (id == null)
    {
        return Unauthorized();
    }

    var usuario = _context.Usuarios

    .Include(u => u.Oposiciones)

    .FirstOrDefault(
        u => u.Id == int.Parse(id)
    );

    if (usuario == null)
{
    return Unauthorized();
}

    return Ok(new
    {
        usuario.Id,

        usuario.Username,

        usuario.Email,

        usuario.OposicionActual,

        usuario.Creditos,  
        
        usuario.FotoPerfil,

        Oposiciones =
        usuario.Oposiciones
        .Select(o => new
        {
            o.Id,
            o.Nombre
        }),

        OposicionActiva =
    usuario.Oposiciones
        .Where(
            o =>
                o.Id ==
                usuario.OposicionActivaId
        )
        .Select(o => new
        {
            o.Id,
            o.Nombre
        })
        .FirstOrDefault()

    });
}
}