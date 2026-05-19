namespace EntrenaTuOposicionAPI.Models.Temarios;

public class Podcast
{
    public int Id { get; set; }

    public string Titulo { get; set; }
        = string.Empty;

    public int ResumenId { get; set; }

    public Resumen Resumen { get; set; }
        = null!;

    public string ArchivoMP3Path { get; set; }
        = string.Empty;

        public string Guion { get; set; }
    = string.Empty;

    public int DuracionMinutos { get; set; }

    public DateTime FechaCreacion { get; set; }
        = DateTime.UtcNow;
}