namespace EntrenaTuOposicionAPI.DTOs;

public class RegisterRequest
{
    public string Username { get; set; }
    = string.Empty;

    public string OposicionActual { get; set; }
    = string.Empty;
    public string Email { get; set; }
        = string.Empty;

    public string Password { get; set; }
        = string.Empty;
}