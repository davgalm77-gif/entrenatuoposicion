using Microsoft.EntityFrameworkCore;
using EntrenaTuOposicionAPI.Models;
using EntrenaTuOposicionAPI.Models.Temarios;


namespace EntrenaTuOposicionAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options
    ) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }

    public DbSet<Oposicion> Oposiciones
    { get; set; }

    public DbSet<Temario> Temarios
    => Set<Temario>();

    public DbSet<Resumen> Resumenes
    => Set<Resumen>();

    public DbSet<Podcast> Podcasts
    => Set<Podcast>();

    public DbSet<Tema> Temas
    => Set<Tema>();
}