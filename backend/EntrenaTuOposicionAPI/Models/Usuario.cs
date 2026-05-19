namespace EntrenaTuOposicionAPI.Models;

public class Usuario
{
    public int Id { get; set; }

    public string Username { get; set; }
    = string.Empty;

    public string OposicionActual { get; set; }
    = string.Empty;

    public string FotoPerfil { get; set; }
    = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public int Creditos { get; set; } = 5;

    public DateTime FechaRegistro { get; set; }
        = DateTime.UtcNow;

    public bool EsAdmin { get; set; }
        = false;

        public List<Oposicion> Oposiciones
    { get; set; }
        = new();
        public int? OposicionActivaId
    { get; set; }
}