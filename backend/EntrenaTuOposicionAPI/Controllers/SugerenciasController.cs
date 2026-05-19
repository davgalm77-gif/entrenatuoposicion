using Microsoft.AspNetCore.Mvc;
using Resend;

namespace entrenatuoposicionAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SugerenciasController : ControllerBase
{
    private readonly IResend _resend;

    public SugerenciasController(
        IResend resend
    )
    {
        _resend = resend;
    }

    [HttpPost]
    public async Task<IActionResult>
        EnviarSugerencia(
            [FromBody]
            SugerenciaRequest request
        )
    {
        var message = new EmailMessage();

        message.From =
    "contacto@entrenatuoposicion.es";

        message.To.Add(
            "davgalm@hotmail.com"
        );

        message.Subject =
            "Nueva sugerencia";

        message.HtmlBody =
            $@"
            <h2>Nueva sugerencia</h2>

            <p>
                <strong>Correo usuario:</strong>
                {request.Email}
            </p>

            <p>
                <strong>Mensaje:</strong>
            </p>

            <p>
                {request.Mensaje}
            </p>
            ";

        await _resend.EmailSendAsync(
            message
        );

        return Ok();
    }
}

public class SugerenciaRequest
{
    public string Email { get; set; } = "";

    public string Mensaje { get; set; } = "";
}