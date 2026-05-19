using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using EntrenaTuOposicionAPI.Data;
using Microsoft.Extensions.FileProviders;
using Resend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions();

builder.Services.AddHttpClient<ResendClient>();

builder.Services.Configure<ResendClientOptions>(
    o =>
    {
        o.ApiToken =
            "re_h2rzAbqD_HUwDMaAsGwUpBc4uhwZJjXcW";
    }
);

builder.Services.AddTransient<IResend, ResendClient>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173",
                    "http://localhost:5183",
                    "https://www.entrenatuoposicion.es"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "Bearer",
        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        {
            Name = "Authorization",

            Type =
                Microsoft.OpenApi.Models.SecuritySchemeType.Http,

            Scheme = "bearer",

            BearerFormat = "JWT",

            In = Microsoft.OpenApi.Models.ParameterLocation.Header,

            Description =
                "Introduce el token JWT"
        });

    options.AddSecurityRequirement(
        new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Reference =
                        new Microsoft.OpenApi.Models.OpenApiReference
                        {
                            Type =
                                Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,

                            Id = "Bearer"
                        }
                },

                Array.Empty<string>()
            }
        });
});

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            builder.Configuration["Jwt:Key"]!
                        )
                    )
            };
    });

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseSwagger();

app.UseSwaggerUI();

// app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseStaticFiles(
    new StaticFileOptions
    {
        FileProvider =
            new PhysicalFileProvider(
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads"
                )
            ),

        RequestPath = "/uploads",

        OnPrepareResponse = ctx =>
        {
            ctx.Context.Response.Headers.Append(
                "Access-Control-Allow-Origin",
                "*"
            );

            ctx.Context.Response.Headers.Append(
                "Access-Control-Allow-Headers",
                "*"
            );

            ctx.Context.Response.Headers.Append(
                "Access-Control-Allow-Methods",
                "*"
            );
        }
    }
);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();