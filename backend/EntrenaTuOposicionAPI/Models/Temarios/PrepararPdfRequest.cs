namespace EntrenaTuOposicionAPI.Models.Temarios;

public class PrepararPdfRequest
{
    public int TemarioId { get; set; }

    public List<int> Paginas { get; set; }
        = new();
}