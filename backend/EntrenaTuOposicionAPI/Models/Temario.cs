using EntrenaTuOposicionAPI.Models.Temarios;
namespace EntrenaTuOposicionAPI.Models;

public class Temario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = "";

    public bool ProcesadoPDF { get; set; }

    public bool ProcesadoIA { get; set; }

    public string ArchivoOriginalPath { get; set; } = "";

    public string ArchivoProcesadoPath { get; set; } = "";

    public int Paginas { get; set; }

    public int TemasDetectados { get; set; }

    public DateTime FechaCreacion { get; set; }
        = DateTime.UtcNow;

    public int OposicionId { get; set; }

    public Oposicion? Oposicion { get; set; }

    public List<Tema> Temas { get; set; }
    = [];

    public List<Resumen> Resumenes { get; set; }
= [];

    public string TextoExtraido { get; set; }
    = string.Empty;
}