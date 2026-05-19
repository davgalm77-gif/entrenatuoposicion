namespace EntrenaTuOposicionAPI.DTOs;

public class CrearResumenRequest
{
    public int TemarioId { get; set; }

    public List<int> TemasSeleccionados { get; set; }
        = [];
}