using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using EntrenaTuOposicionAPI.DTOs;
using EntrenaTuOposicionAPI.Data;
using EntrenaTuOposicionAPI.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;
using PdfSharpCore.Pdf.IO;
using EntrenaTuOposicionAPI.Models.Temarios;
using System.Text.RegularExpressions;
using OpenAI;
using RestSharp;
using OpenAI.Chat;
using PdfSharpCore.Pdf;


namespace EntrenaTuOposicionAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TemariosController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public TemariosController(
        AppDbContext context,
        IConfiguration configuration
    )
    {
        _context = context;

        _configuration = configuration;
    }

    [HttpGet]
    public IActionResult ObtenerTemarios()
    {
        var userId = User.FindFirst(
            ClaimTypes.NameIdentifier
        )?.Value;

        if (userId == null)
        {
            return Unauthorized();
        }

        var usuario = _context.Usuarios
            .Include(u => u.Oposiciones)
            .FirstOrDefault(
                u => u.Id == int.Parse(userId)
            );

        if (
            usuario == null ||
            usuario.OposicionActivaId == null
        )
        {
            return BadRequest();
        }

        var temarios = _context.Temarios
            .Where(t =>
                t.OposicionId ==
                usuario.OposicionActivaId
            )
            .OrderByDescending(
                t => t.FechaCreacion
            )
            .ToList();

        return Ok(
    temarios.Select(t => new
    {
        t.Id,
        t.Nombre,
        t.ProcesadoPDF,
        t.ProcesadoIA,
        t.Paginas,
        t.TemasDetectados,
        t.FechaCreacion
    })
);
    }

    [HttpGet("{id}")]
public IActionResult ObtenerTemario(
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

    if (
        usuario == null ||
        usuario.OposicionActivaId == null
    )
    {
        return BadRequest();
    }

    var temario = _context.Temarios
        .FirstOrDefault(t =>
            t.Id == id &&
            t.OposicionId ==
            usuario.OposicionActivaId
        );

    if (temario == null)
    {
        return NotFound();
    }

    return Ok(new
{
    temario.Id,
    temario.Nombre,
    temario.Paginas,
    temario.ProcesadoPDF,
    temario.ProcesadoIA,
    temario.TemasDetectados,

    ArchivoOriginalPath =
        temario.ArchivoOriginalPath
});
}

    [HttpPost]
public IActionResult CrearTemario(
    [FromBody] CrearTemarioRequest request
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

        if (
            usuario == null ||
            usuario.OposicionActivaId == null
        )
        {
            return BadRequest();
        }

        var temario = new Temario
        {
            Nombre = request.Nombre,

            OposicionId =
                usuario.OposicionActivaId.Value
        };

        _context.Temarios.Add(
            temario
        );

        _context.SaveChanges();

        return Ok(temario);
    }

    [HttpPost("preparar-pdf")]
public async Task<IActionResult> PrepararPdf(
    [FromBody] PrepararPdfRequest request
)
{
    var temario =
        await _context.Temarios.FindAsync(
            request.TemarioId
        );

    if (temario == null)
    {
        return NotFound();
    }

    var rutaOriginal =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            temario.ArchivoOriginalPath.TrimStart('/')
        );

    var documentoOriginal =
        PdfReader.Open(
            rutaOriginal,
            PdfDocumentOpenMode.Import
        );

    var nuevoDocumento =
    new PdfSharpCore.Pdf.PdfDocument();

    foreach (var paginaNumero in request.Paginas)
    {
        var pagina =
            documentoOriginal.Pages[
                paginaNumero - 1
            ];

        nuevoDocumento.AddPage(pagina);
    }

    var nombreNuevo =
        $"{Guid.NewGuid()}.pdf";

    var carpetaDestino =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "uploads",
            "preparados"
        );

    Directory.CreateDirectory(
        carpetaDestino
    );

    var rutaNuevoPdf =
        Path.Combine(
            carpetaDestino,
            nombreNuevo
        );

    nuevoDocumento.Save(
        rutaNuevoPdf
    );

    System.IO.File.Delete(
        rutaOriginal
    );

    var nuevoTemario =
    new Temario
    {

        Nombre = temario.Nombre,

        ArchivoOriginalPath =
            $"/uploads/preparados/{nombreNuevo}",

        ProcesadoPDF = true,

        ProcesadoIA = false,

        Paginas =
            request.Paginas.Count,

        TemasDetectados = 0,

        FechaCreacion =
            DateTime.UtcNow,

        OposicionId =
            temario.OposicionId
    };

_context.Temarios.Add(
    nuevoTemario
);

_context.Temarios.Remove(
    temario
);

await _context.SaveChangesAsync();

return Ok(nuevoTemario);
}

    [HttpPost("upload")]
public async Task<IActionResult> SubirPDF(
    IFormFile archivo
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

    if (
        usuario == null ||
        usuario.OposicionActivaId == null
    )
    {
        return BadRequest();
    }

    if (
        archivo == null ||
        archivo.Length == 0
    )
    {
        return BadRequest(
            "No se ha seleccionado ningún PDF"
        );
    }

    var nombreArchivo =
        $"{Guid.NewGuid()}_{archivo.FileName}";

    var ruta =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "uploads",
            "originales",
            nombreArchivo
        );

        var rutaProcesado =
    Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot",
        "uploads",
        "procesados",
        nombreArchivo
    );

    using (
        var stream =
            new FileStream(
                ruta,
                FileMode.Create
            )
    )
    {
        await archivo.CopyToAsync(
            stream
        );
    }

    System.IO.File.Copy(
    ruta,
    rutaProcesado
);

    int paginas = 0;

using (
    var pdf =
        PdfReader.Open(
            ruta
        )
)
{
    paginas =
    pdf.PageCount;
}

    var temario = new Temario
    {
        Nombre =
            Path.GetFileNameWithoutExtension(
                archivo.FileName
            ),

        ArchivoOriginalPath =
            $"/uploads/originales/{nombreArchivo}",

            ArchivoProcesadoPath =
            $"/uploads/procesados/{nombreArchivo}",

        ProcesadoPDF = false,

        ProcesadoIA = false,

        Paginas = paginas,

        TemasDetectados = 0,

        OposicionId =
            usuario.OposicionActivaId.Value
    };

    _context.Temarios.Add(
        temario
    );

    await _context.SaveChangesAsync();

    return Ok(temario);
}
[HttpDelete("{id}")]
public async Task<IActionResult> EliminarTemario(
    int id
)
{
    var temario =
        await _context.Temarios.FindAsync(id);

    if (temario == null)
    {
        return NotFound();
    }

    _context.Temarios.Remove(temario);

    await _context.SaveChangesAsync();

    return Ok();
}

[HttpPut("{id}/renombrar")]
public async Task<IActionResult> RenombrarTemario(
    int id,
    [FromBody] string nombre
)
{
    var temario =
        await _context.Temarios.FindAsync(id);

    if (temario == null)
    {
        return NotFound();
    }

    temario.Nombre = nombre;

    await _context.SaveChangesAsync();

    return Ok();
}

[HttpPost("{id}/procesar-ia")]
public async Task<IActionResult> ProcesarIA(
    int id
)
{
    var temario =
        await _context.Temarios
            .Include(t => t.Temas)
            .FirstOrDefaultAsync(
                t => t.Id == id
            );

    if (temario == null)
    {
        return NotFound();
    }

    var rutaPdf =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            temario.ArchivoOriginalPath.TrimStart('/')
        );

    var textoCompleto = "";

    await _context.Temas
        .Where(t =>
            t.TemarioId == temario.Id
        )
        .ExecuteDeleteAsync();

    using (
        var pdf =
            UglyToad.PdfPig.PdfDocument.Open(
                rutaPdf
            )
    )
    {
        foreach (var pagina in pdf.GetPages())
        {
            textoCompleto +=
                string.Join(
                    "\n",
                    pagina.GetWords()
                        .Select(w => w.Text)
                ) + "\n";
        }
    }

    temario.TextoExtraido =
        textoCompleto;

    var rutaDebug =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "texto_extraido.txt"
        );

    System.IO.File.WriteAllText(
        rutaDebug,
        textoCompleto
    );

    textoCompleto =
        textoCompleto
            .Replace("  ", " ");

    var temasDetectados =
        new List<Tema>();

    var matches =
        Regex.Matches(
            textoCompleto,

            @"(?:^|\n)([1-9][0-9]?\.\s+[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{3,60})",

            RegexOptions.Multiline
        );

    int orden = 1;

    for (int i = 0; i < matches.Count; i++)
    {
        var match =
            matches[i];

        var titulo =
            match.Groups[1]
                .Value
                .Trim();

        var inicio =
            match.Index;

        var siguienteIndice =
            i + 1;

        var fin =
            siguienteIndice < matches.Count
                ? matches[siguienteIndice].Index
                : textoCompleto.Length;

        var contenidoTema =
            textoCompleto.Substring(
                inicio,
                fin - inicio
            );

        var apiKey =
            _configuration["OpenAI:ApiKey"];

        var client =
            new OpenAIClient(apiKey);

        var chatClient =
            client.GetChatClient("gpt-4.1-mini");

        var prompt = $@"
Limpia este título de tema de oposición.

Devuelve SOLO el título limpio.
Sin explicaciones.

Los títulos deben tener formato natural, no todo en mayúsculas.

No incluyas símbolos, barras, guiones ni caracteres especiales al final del título.

Ejemplo correcto:

Ayudas visuales

Ejemplo incorrecto:

AYUDAS VISUALES /

Título:
{titulo}
";

Console.WriteLine("1 - Generando guion...");

        var completion =
            chatClient.CompleteChat(
                prompt
            );

            Console.WriteLine("2 - Guion generado");

        titulo =
            completion.Value.Content[0]
                .Text
                .Trim();

        temasDetectados.Add(
            new Tema
            {
                Titulo = titulo,

                Contenido =
                    contenidoTema,

                Orden = orden,

                TemarioId =
                    temario.Id
            }
        );

        orden++;
    }

    if (
        temasDetectados.Count == 0
    )
    {
        temasDetectados.Add(
            new Tema
            {
                Titulo =
                    "Tema 1",

                Contenido =
                    textoCompleto,

                Orden = 1,

                TemarioId =
                    temario.Id
            }
        );
    }

    _context.Temas.AddRange(
        temasDetectados
    );

    temario.ProcesadoIA = true;

    temario.TemasDetectados =
        temasDetectados.Count;

    await _context.SaveChangesAsync();

    return Ok();
}

[HttpGet("{id}/temas")]
public async Task<IActionResult> ObtenerTemas(
    int id
)
{
    var temas =
        await _context.Temas
            .Where(t =>
                t.TemarioId == id
            )
            .OrderBy(t =>
                t.Orden
            )
            .Select(t => new
            {
                t.Id,
                t.Titulo
            })
            .ToListAsync();

    return Ok(temas);
}

[HttpPost("{id}/resumenes")]
public async Task<IActionResult> CrearResumen(
    int id,
    [FromBody] CrearResumenRequest request
)
{
    var temario =
        await _context.Temarios
            .FindAsync(id);

    if (temario == null)
    {
        return NotFound();
    }

    var temas =
    await _context.Temas
        .Where(t =>
            request.TemasSeleccionados
                .Contains(t.Id)
        )
        .OrderBy(t => t.Orden)
        .ToListAsync();

        var textoTemas =
    string.Join(
        "\n\n",
        temas.Select(t =>
            $"TEMA: {t.Titulo}\n\n{t.Contenido}"
        )
    );

    var contextoTemario =
    temario.TextoExtraido.Length > 4000
        ? temario.TextoExtraido.Substring(0, 4000)
        : temario.TextoExtraido;

var apiKey =
    _configuration["OpenAI:ApiKey"];
    

var client =
    new OpenAIClient(apiKey);

var chatClient =
    client.GetChatClient("gpt-4.1-mini");

    var prompt = $@"

Antes de explicar el contenido, analiza el contexto general del temario para entender correctamente de qué ámbito trata.

Contexto general del temario:

{contextoTemario}

Actúa como un profesor experto en oposiciones.

Tu tarea es explicar el contenido del tema de forma clara, natural y fácil de entender, pero manteniendo la información real y el contenido importante del temario.

NO hagas esquemas.
NO hagas listas de puntos.
NO conviertas el contenido en un índice.
NO copies literalmente el texto original.
NO inventes información.

Debes:

- Explicar el contenido real del tema con palabras más humanas y comprensibles.
- Mantener los tecnicismos importantes propios de la oposición, pero explicándolos de forma sencilla.
- Seguir el orden real de los apartados del tema.
- Explicar cada apartado importante de forma desarrollada y fácil de entender.
- Simplificar conceptos complejos sin perder el significado real.
- Hacer que el contenido sea más fácil de estudiar y recordar.
- Mantener un tono claro, cercano y profesional.
- El resultado debe sentirse como un profesor explicando el tema.
- Empieza directamente explicando el contenido, sin frases introductorias tipo “vamos a ver”, “a continuación” o “en este tema”.

IMPORTANTE:

- El resultado debe sentirse como una explicación desarrollada del tema real.
- Usa Markdown solo para separar bloques importantes.
- Evita lenguaje robótico o demasiado académico.
- Cada apartado debe quedar explicado de forma clara y entendible.

Contenido del temario:

{textoTemas}
";

var completion =
    chatClient.CompleteChat(
        prompt
    );

var contenidoResumen =
    completion.Value.Content[0]
        .Text
        .Trim();

    var resumen = new Resumen
    {
        Titulo =
    temas.Count == 1

        ? temas.First().Titulo

        : $"Resumen de temas {string.Join(
            ", ",
            temas.Select(t => t.Orden)
        )}",

        TemarioId = temario.Id,

        NumeroTemas =
            request.TemasSeleccionados.Count,

        Paginas =
            request.TemasSeleccionados.Count * 10,

        Contenido =
    contenidoResumen,

        FechaCreacion =
            DateTime.UtcNow
    };

    _context.Resumenes.Add(
        resumen
    );

    await _context.SaveChangesAsync();

    return Ok(new
    {
        resumen.Id,
        resumen.Titulo,
        resumen.NumeroTemas,
        resumen.Paginas
    });
}

[HttpGet("{id}/resumenes")]
public async Task<IActionResult> ObtenerResumenes(
    int id
)
{
    var resumenes =
        await _context.Resumenes
            .Where(r =>
                r.TemarioId == id
            )
            .OrderByDescending(
                r => r.FechaCreacion
            )
            .Select(r => new
            {
                r.Id,
                r.Titulo,
                temas = r.NumeroTemas,
                r.Paginas
            })
            .ToListAsync();

    return Ok(resumenes);
}

[HttpGet("resumenes/{id}")]
public async Task<IActionResult> ObtenerResumen(
    int id
)
{
    var resumen =
        await _context.Resumenes
            .FirstOrDefaultAsync(
                r => r.Id == id
            );

    if (resumen == null)
    {
        return NotFound();
    }

    return Ok(new
    {
        resumen.Id,
        resumen.Titulo,
        temas =
        resumen.NumeroTemas,
        resumen.Paginas,
        resumen.Contenido
    });
}

[HttpDelete("resumenes/{id}")]
public async Task<IActionResult> EliminarResumen(
    int id
)
{
    var resumen =
        await _context.Resumenes
            .FirstOrDefaultAsync(
                r => r.Id == id
            );

    if (resumen == null)
    {
        return NotFound();
    }

    _context.Resumenes.Remove(
        resumen
    );

    await _context.SaveChangesAsync();

    return Ok();
}

[HttpPost("podcasts")]
public async Task<IActionResult> CrearPodcast(
    [FromBody] CrearPodcastRequest request
)
{
    var resumen =
        await _context.Resumenes
            .FindAsync(
                request.ResumenId
            );

    if (resumen == null)
    {
        return NotFound();
    }

    var apiKey =
    _configuration["OpenAI:ApiKey"];

    var elevenApiKey =
    _configuration["ElevenLabs:ApiKey"];

var femaleVoiceId =
    _configuration["ElevenLabs:FemaleVoiceId"];

var maleVoiceId =
    _configuration["ElevenLabs:MaleVoiceId"];

var client =
    new OpenAIClient(apiKey);

var chatClient =
    client.GetChatClient("gpt-4.1-mini");

var prompt = $@"

Convierte este resumen de oposición en un podcast natural entre dos personas.

Una persona es un chico y otra una chica.

El tono debe ser:

- Natural
- Cercano
- Fluido
- Fácil de escuchar
- Tipo podcast educativo moderno

MUY IMPORTANTE:

- NO debe sonar como un texto leído.
- Debe parecer una conversación real.
- Deben explicarse los conceptos importantes de forma sencilla.
- Usa ejemplos prácticos cuando ayuden a entender algo.
- Las dos personas deben participar de verdad.
- Alterna preguntas, explicaciones y comentarios naturales.
- Evita saludos largos o despedidas largas.
- No uses formato markdown.
- No pongas títulos.
- No pongas listas.
- El resultado debe ser únicamente el diálogo.

IMPORTANTE:

Cada línea DEBE empezar obligatoriamente por:

CHICO:
o
CHICA:

Las dos personas deben participar continuamente.

NO puedes hacer que solo hable una persona.

Formato obligatorio:

CHICO: texto...
CHICA: texto...
CHICO: texto...
CHICA: texto...

No uses otro formato.

Resumen:

{resumen.Contenido}

";

var completion =
    chatClient.CompleteChat(
        prompt
    );

var guionPodcast =
    completion.Value.Content[0]
        .Text
        .Trim();

        guionPodcast = guionPodcast
    .Replace("Chico:", "CHICO:")
    .Replace("Chica:", "CHICA:")
    .Replace("chico:", "CHICO:")
    .Replace("chica:", "CHICA:");

        var textoPodcast =
    guionPodcast.Length > 5000

        ? guionPodcast.Substring(0, 5000)

        : guionPodcast;

        var speechClient =
    client.GetAudioClient(
        "gpt-4o-mini-tts"
    );

var nombreArchivo =
    $"{Guid.NewGuid()}.mp3";

var carpetaPodcasts =
    Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot",
        "podcasts"
    );

Directory.CreateDirectory(
    carpetaPodcasts
);

var rutaArchivo =
    Path.Combine(
        carpetaPodcasts,
        nombreArchivo
    );

var carpetaTemporal =
    Path.Combine(
        carpetaPodcasts,
        Guid.NewGuid().ToString()
    );

Directory.CreateDirectory(
    carpetaTemporal
);

var lineas =
    guionPodcast
        .Split(
            new[]
            {
                "CHICO:",
                "CHICA:"
            },
            StringSplitOptions.RemoveEmptyEntries
        )
        .Select((texto, index) => new
        {
            Voz =
                index % 2 == 0
                    ? "echo"
                    : "nova",

            Texto =
                texto.Trim()
        })
        .Where(x =>
            !string.IsNullOrWhiteSpace(
                x.Texto
            )
        )
        .ToList();

var audiosGenerados =
    new List<string>();

int indice = 0;

foreach (var linea in lineas)
{
    indice++;

    var voz =
        linea.Voz;

    var texto =
        linea.Texto;

    Console.WriteLine(
        "3 - Generando audio..."
    );

    var voiceId =
    indice % 2 == 0
        ? femaleVoiceId
        : maleVoiceId;

var clientEleven =
    new RestClient(
        $"https://api.elevenlabs.io/v1/text-to-speech/{voiceId}"
    );

var requestEleven =
    new RestRequest();

requestEleven.AddHeader(
    "xi-api-key",
    elevenApiKey
);

requestEleven.AddHeader(
    "Accept",
    "audio/mpeg"
);

requestEleven.AddHeader(
    "Content-Type",
    "application/json"
);

requestEleven.AddJsonBody(new
{
    text = texto,

    model_id =
        "eleven_multilingual_v2",

    voice_settings = new
    {
        stability = 0.45,
        similarity_boost = 0.80,
        style = 0.20,
        use_speaker_boost = true
    }
});

Console.WriteLine(
    $"VOICE ID: {voiceId}"
);

var response =
    await clientEleven
        .ExecutePostAsync(
            requestEleven
        );

if (!response.IsSuccessful)
{
    throw new Exception(
        response.Content
    );
}

var audioBytes =
    response.RawBytes;

        if (audioBytes == null)
{
    throw new Exception(
        "ElevenLabs no devolvió audio"
    );
}

    var nombreTemporal =
        $"temp_{indice}.mp3";

    var rutaTemporal =
        Path.Combine(
            carpetaTemporal,
            nombreTemporal
        );

    await System.IO.File.WriteAllBytesAsync(
        rutaTemporal,
        audioBytes
    );

    audiosGenerados.Add(
        rutaTemporal
    );
}

var archivoLista =
    Path.Combine(
        carpetaTemporal,
        "lista.txt"
    );

await System.IO.File.WriteAllLinesAsync(
    archivoLista,

    audiosGenerados.Select(a =>
        $"file '{a.Replace("\\", "/")}'"
    )
);

Console.WriteLine(
    "4 - Uniendo audios..."
);

var proceso =
    new System.Diagnostics.Process();

proceso.StartInfo.FileName =
    "ffmpeg";

proceso.StartInfo.Arguments =
    $"-f concat -safe 0 -i \"{archivoLista}\" -c copy \"{rutaArchivo}\" -y";

proceso.StartInfo.UseShellExecute =
    false;

proceso.StartInfo.CreateNoWindow =
    true;

proceso.StartInfo.RedirectStandardError =
    true;

proceso.Start();

var errores =
    await proceso.StandardError
        .ReadToEndAsync();

await proceso.WaitForExitAsync();

Console.WriteLine(
    "5 - Podcast terminado"
);

if (proceso.ExitCode != 0)
{
    throw new Exception(
        errores
    );
}

var podcast = new Podcast
{
    Titulo =
        resumen.Titulo,

    ResumenId =
        resumen.Id,

    Guion =
        guionPodcast,

    ArchivoMP3Path =
        $"/podcasts/{nombreArchivo}",

    DuracionMinutos = 12,

    FechaCreacion =
        DateTime.UtcNow
};

_context.Podcasts.Add(
    podcast
);

await _context.SaveChangesAsync();

return Ok(new
{
    podcast.Id,
    podcast.Titulo,

    podcast.Guion,

    audioUrl =
        podcast.ArchivoMP3Path,

    duracion =
        $"{podcast.DuracionMinutos} min"
});
}

[HttpGet("{id}/podcasts")]
public async Task<IActionResult> ObtenerPodcasts(
    int id
)
{
    var podcasts =
        await _context.Podcasts
            .Where(p =>
                p.Resumen.TemarioId == id
            )
            .OrderByDescending(
                p => p.FechaCreacion
            )
            .Select(p => new
            {
                p.Id,
                p.Titulo,
                duracion =
                    $"{p.DuracionMinutos} min"
            })
            .ToListAsync();

    return Ok(podcasts);
}

[HttpDelete("podcasts/{id}")]
public async Task<IActionResult> EliminarPodcast(
    int id
)
{
    var podcast =
        await _context.Podcasts
            .FirstOrDefaultAsync(
                p => p.Id == id
            );

    if (podcast == null)
    {
        return NotFound();
    }

    _context.Podcasts.Remove(
        podcast
    );

    await _context.SaveChangesAsync();

    return Ok();
}

[HttpPost("unir")]
public async Task<IActionResult> UnirPDFs(
    
    [FromBody]
    UnirTemariosRequest request
)
{
    var temarios =
    await _context.Temarios
        .Where(t =>
            request.TemariosIds
                .Contains(t.Id)
        )
        .ToListAsync();

if (temarios.Count < 2)
{
    return BadRequest(
        "Debes seleccionar al menos 2 PDFs."
    );
}

var documentoFinal =
    new PdfSharpCore.Pdf.PdfDocument();

    foreach (var temario in temarios)
{
    var rutaPdf =
    Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot",
        temario.ArchivoOriginalPath
            .TrimStart('/')
    );

var pdf =
    PdfReader.Open(
        rutaPdf,
        PdfDocumentOpenMode.Import
    );

    for (
    int i = 0;
    i < pdf.PageCount;
    i++
)
{
    documentoFinal.AddPage(
        pdf.Pages[i]
    );
}
}

var nombreArchivo =
    $"{Guid.NewGuid()}.pdf";

var carpetaUploads =
    Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot",
        "uploads"
    );

var rutaFinal =
    Path.Combine(
        carpetaUploads,
        nombreArchivo
    );

    documentoFinal.Save(
    rutaFinal
);

_context.Temarios.RemoveRange(
    temarios
);

var nuevoTemario =
    new Temario
    {
        Nombre =
            request.Nombre,

        ArchivoOriginalPath =
            $"/uploads/{nombreArchivo}",

            OposicionId =
    temarios.First().OposicionId,

        ProcesadoPDF = false,

        ProcesadoIA = false,

        Paginas =
            documentoFinal.PageCount
    };

    _context.Temarios.Add(
    nuevoTemario
);

await _context.SaveChangesAsync();

return Ok(nuevoTemario);

}

}