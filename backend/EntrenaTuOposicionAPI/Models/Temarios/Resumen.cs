namespace EntrenaTuOposicionAPI.Models.Temarios;

public class Resumen
{
    public int Id { get; set; }

    public string Titulo { get; set; }
        = string.Empty;

    public int TemarioId { get; set; }

    public Temario Temario { get; set; }
        = null!;

    public int NumeroTemas { get; set; }

    public int Paginas { get; set; }

    public string Contenido { get; set; }
        = string.Empty;

    public DateTime FechaCreacion { get; set; }
        = DateTime.UtcNow;
}