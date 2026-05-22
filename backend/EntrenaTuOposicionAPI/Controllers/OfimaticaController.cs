using System.Text;
using System.Text.Json;

using Microsoft.AspNetCore.Mvc;

using OpenAI.Chat;

namespace EntrenaTuOposicionAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfimaticaController
    : ControllerBase
{

    private readonly IConfiguration _configuration;

    public OfimaticaController(
        IConfiguration configuration
    )
    {
        _configuration =
            configuration;
    }

    [HttpPost("access")]
    public async Task<IActionResult> GenerarAccess()
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
Genera 20 preguntas de Microsoft Access nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- tablas
- consultas
- formularios
- informes
- relaciones
- claves primarias
- tipos de datos
- filtros
- ordenación
- macros
- expresiones
- funciones básicas
- importación y exportación
- bases de datos relacionales
- diseño de bases de datos
- validación de datos
- índices
- asistentes de Access
- vistas de diseño
- consultas de acción

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- funcionamiento de herramientas
- conceptos técnicos
- resolución de situaciones
- opciones de menú y configuración

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

    [HttpPost("correo")]
    public async Task<IActionResult> GenerarCorreo()
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
Genera 20 preguntas sobre correo electrónico nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- correo electrónico
- email
- Outlook
- Gmail
- bandeja de entrada
- CC y CCO
- adjuntos
- firmas
- spam
- phishing
- carpetas
- reglas de correo
- contactos
- calendario
- envío y recepción
- protocolos POP3, IMAP y SMTP
- seguridad del correo
- organización de mensajes
- respuestas automáticas
- gestión de correos
- etiquetas y categorías
- archivado
- búsqueda de correos
- sincronización
- uso profesional del email

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- situaciones reales
- funcionamiento de herramientas
- conceptos técnicos
- seguridad informática básica
- organización y productividad

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

    [HttpPost("excell")]
    public async Task<IActionResult> GenerarExcell()
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
Genera 20 preguntas de Microsoft Excel nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- hojas de cálculo
- fórmulas
- funciones
- SUMA
- PROMEDIO
- SI
- BUSCARV
- BUSCARX
- tablas
- tablas dinámicas
- filtros
- ordenación
- gráficos
- referencias absolutas y relativas
- formato condicional
- validación de datos
- celdas
- rangos
- combinar celdas
- inmovilizar paneles
- protección de hojas
- macros
- importación y exportación de datos
- impresión
- funciones de fecha y hora
- funciones lógicas
- funciones de texto
- funciones matemáticas
- herramientas de análisis
- gestión de libros
- fórmulas anidadas
- atajos de teclado
- productividad en Excel

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- situaciones reales
- resolución de problemas
- interpretación de funciones
- productividad
- configuración de herramientas
- análisis de datos

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

    [HttpPost("internet")]
    public async Task<IActionResult> GenerarInternet()
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
Genera 20 preguntas sobre Internet nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- Internet
- navegadores web
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- buscadores
- motores de búsqueda
- URLs
- páginas web
- pestañas
- historial
- caché
- cookies
- descargas
- favoritos
- marcadores
- navegación privada
- seguridad en Internet
- phishing
- malware
- certificados HTTPS
- conexiones seguras
- redes
- WiFi
- protocolos HTTP y HTTPS
- nube
- almacenamiento online
- formularios web
- videollamadas
- plataformas online
- servicios web
- sincronización
- cuentas online
- navegación segura
- productividad en Internet

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- situaciones reales
- navegación web
- seguridad informática básica
- productividad
- resolución de problemas
- funcionamiento de herramientas online

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

    [HttpPost("powerpoint")]
    public async Task<IActionResult> GenerarPowerpoint()
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
Genera 20 preguntas de Microsoft PowerPoint nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- diapositivas
- presentaciones
- transiciones
- animaciones
- diseño de diapositivas
- plantillas
- temas
- insertar imágenes
- insertar tablas
- insertar gráficos
- SmartArt
- hipervínculos
- multimedia
- vídeos y audio
- vista clasificador
- vista presentación
- patrones de diapositivas
- encabezados y pies de página
- comentarios
- impresión
- exportación
- formato de texto
- alineación de objetos
- herramientas de presentación
- presentaciones automáticas
- temporización
- combinación de presentaciones
- organización de diapositivas
- compatibilidad de archivos

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- situaciones reales
- funcionamiento de herramientas
- opciones de menú
- productividad
- configuración y diseño
- resolución de problemas

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

    [HttpPost("windows")]
    public async Task<IActionResult> GenerarWindows()
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
Genera 20 preguntas sobre Windows 11 nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- Windows 11
- escritorio
- explorador de archivos
- menú inicio
- barra de tareas
- configuraciones
- panel de configuración
- ventanas
- carpetas
- archivos
- accesos directos
- papelera de reciclaje
- administrador de tareas
- atajos de teclado
- búsqueda de Windows
- actualizaciones
- cuentas de usuario
- permisos
- redes
- WiFi
- Bluetooth
- impresoras
- almacenamiento
- disco duro
- OneDrive
- seguridad de Windows
- Windows Defender
- copias de seguridad
- productividad
- multitarea
- escritorios virtuales
- herramientas del sistema
- captura de pantalla
- aplicaciones predeterminadas
- instalación y desinstalación de programas
- notificaciones
- opciones de energía

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- situaciones reales
- configuración del sistema
- productividad
- resolución de problemas
- seguridad básica
- administración de Windows

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

    [HttpPost("word")]
    public async Task<IActionResult> GenerarWord()
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
Genera 20 preguntas de Microsoft Word nivel oposición.

Las preguntas deben ser variadas, realistas y orientadas a exámenes oficiales.

Temas permitidos:
- documentos
- formato de texto
- estilos
- fuentes
- párrafos
- alineación
- sangrías
- interlineado
- márgenes
- encabezados y pies de página
- tablas
- imágenes
- WordArt
- SmartArt
- referencias
- índice automático
- tabla de contenido
- revisión ortográfica
- comentarios
- control de cambios
- combinación de correspondencia
- impresión
- saltos de página
- secciones
- numeración
- viñetas
- columnas
- búsqueda y reemplazo
- atajos de teclado
- plantillas
- formato condicional
- hipervínculos
- exportación a PDF
- herramientas de productividad
- vistas del documento
- protección de documentos

REQUISITOS IMPORTANTES:

- Las 20 preguntas deben ser COMPLETAMENTE diferentes entre sí.
- NO repitas estructuras.
- NO repitas conceptos.
- NO repitas ejemplos similares.
- NO hagas variantes casi iguales.
- Cada pregunta debe sentirse única.

Además:
- NO repitas preguntas típicas o demasiado conocidas.
- Evita preguntas genéricas usadas frecuentemente.
- Genera preguntas originales y realistas de oposición.

También:
- NO repitas ninguna pregunta usada anteriormente en otros tests.
- Cada generación debe producir preguntas nuevas y distintas.

Las preguntas deben mezclar:
- teoría
- uso práctico
- situaciones reales
- productividad
- configuración de herramientas
- edición y formato
- resolución de problemas
- funciones avanzadas de Word

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