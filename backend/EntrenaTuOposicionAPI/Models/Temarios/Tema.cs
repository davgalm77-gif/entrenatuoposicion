namespace EntrenaTuOposicionAPI.Models.Temarios;

public class Tema
{
    public int Id { get; set; }

    public string Titulo { get; set; }
        = string.Empty;

    public string Contenido { get; set; }
        = string.Empty;

    public int Orden { get; set; }

    public int TemarioId { get; set; }

    public Temario Temario { get; set; }
        = null!;
}