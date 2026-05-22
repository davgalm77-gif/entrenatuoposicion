using System.Text;
using System.Text.Json;

using Microsoft.AspNetCore.Mvc;

using OpenAI.Chat;

namespace EntrenaTuOposicionAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PsicotecnicosController
    : ControllerBase
{

    private readonly IConfiguration _configuration;

    public PsicotecnicosController(
        IConfiguration configuration
    )
    {
        _configuration =
            configuration;
    }

    [HttpPost("verbal")]
    public async Task<IActionResult> GenerarVerbal()
    {

        var apiKey =
            _configuration["OpenAI:ApiKey"];

        var client =
            new ChatClient(
                model: "gpt-4.1-mini",
                apiKey: apiKey
            );

        var prompt =
"""
Genera 20 preguntas psicotécnicas verbales nivel oposición.

Las preguntas deben ser variadas y realistas.

Tipos permitidos:
- analogías
- sinónimos
- antónimos
- vocabulario
- razonamiento verbal
- palabra que no encaja
- comprensión verbal

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas palabras clave.
- NO repitas conceptos.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o muy conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Cada pregunta debe incluir:
- pregunta
- 4 opciones
- correcta
- explicación breve

La respuesta correcta debe ser:
A, B, C o D.

Devuelve EXCLUSIVAMENTE JSON válido.

NO uses markdown.
NO uses ```json.
NO expliques nada fuera del JSON.

Formato exacto:

[
  {
    "pregunta": "texto",
    "opciones": [
      "opcion A",
      "opcion B",
      "opcion C",
      "opcion D"
    ],
    "correcta": "A",
    "explicacion": "explicación breve"
  }
]
""";

        var completion =
    await client.CompleteChatAsync(
        prompt
    );

var contenido =
    completion.Value.Content[0]
        .Text;


        var preguntas =
            JsonSerializer.Deserialize<object>(
                contenido,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            );

        return Ok(
    new
    {
        preguntas,

        promptTokens =
            completion.Value.Usage
                .InputTokenCount,

        completionTokens =
            completion.Value.Usage
                .OutputTokenCount,

        totalTokens =
            completion.Value.Usage
                .TotalTokenCount
    }
);

    }

    [HttpPost("numerico")]
    public async Task<IActionResult> GenerarNumerico()
    {

        var apiKey =
            _configuration["OpenAI:ApiKey"];

        var client =
            new ChatClient(
                model: "gpt-4.1-mini",
                apiKey: apiKey
            );

        var prompt =
"""
Genera 20 preguntas psicotécnicas numéricas nivel oposición.

Las preguntas deben ser variadas, realistas y con dificultad media-alta.

Tipos permitidos:
- operaciones matemáticas
- porcentajes
- reglas de tres
- series numéricas
- razonamiento numérico
- problemas matemáticos rápidos
- secuencias
- lógica matemática
- cálculo mental
- proporciones

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas números constantemente.
- NO repitas operaciones similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o muy conocidas.
- Evita ejercicios demasiado básicos.
- Genera preguntas originales.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben poder resolverse mentalmente o con cálculo rápido.

NO generes operaciones excesivamente largas o complejas.

La dificultad debe parecer realista para pruebas psicotécnicas oficiales de oposiciones.

Cada pregunta debe incluir:
- pregunta
- 4 opciones
- correcta
- explicación breve

La respuesta correcta debe ser:
A, B, C o D.

Devuelve EXCLUSIVAMENTE JSON válido.

NO uses markdown.
NO uses ```json.
NO expliques nada fuera del JSON.

Formato exacto:

[
  {
    "pregunta": "texto",
    "opciones": [
      "opcion A",
      "opcion B",
      "opcion C",
      "opcion D"
    ],
    "correcta": "A",
    "explicacion": "explicación breve"
  }
]
""";

        var completion =
    await client.CompleteChatAsync(
        prompt
    );

var contenido =
    completion.Value.Content[0]
        .Text;


        var preguntas =
            JsonSerializer.Deserialize<object>(
                contenido,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            );

        return Ok(
    new
    {
        preguntas,

        promptTokens =
            completion.Value.Usage
                .InputTokenCount,

        completionTokens =
            completion.Value.Usage
                .OutputTokenCount,

        totalTokens =
            completion.Value.Usage
                .TotalTokenCount
    }
);

    }

}