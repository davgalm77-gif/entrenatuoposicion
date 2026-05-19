namespace EntrenaTuOposicionAPI.Models;

public class Oposicion
{
    public int Id { get; set; }

    public string Nombre { get; set; }
        = string.Empty;

    public int UsuarioId { get; set; }

    public Usuario Usuario { get; set; }
        = null!;

        public List<Temario> Temarios
    { get; set; } = [];
}