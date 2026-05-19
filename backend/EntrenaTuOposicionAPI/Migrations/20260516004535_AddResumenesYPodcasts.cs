using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EntrenaTuOposicionAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddResumenesYPodcasts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Resumenes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Titulo = table.Column<string>(type: "text", nullable: false),
                    TemarioId = table.Column<int>(type: "integer", nullable: false),
                    NumeroTemas = table.Column<int>(type: "integer", nullable: false),
                    Paginas = table.Column<int>(type: "integer", nullable: false),
                    Contenido = table.Column<string>(type: "text", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resumenes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resumenes_Temarios_TemarioId",
                        column: x => x.TemarioId,
                        principalTable: "Temarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Podcasts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Titulo = table.Column<string>(type: "text", nullable: false),
                    ResumenId = table.Column<int>(type: "integer", nullable: false),
                    ArchivoMP3Path = table.Column<string>(type: "text", nullable: false),
                    DuracionMinutos = table.Column<int>(type: "integer", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Podcasts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Podcasts_Resumenes_ResumenId",
                        column: x => x.ResumenId,
                        principalTable: "Resumenes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Podcasts_ResumenId",
                table: "Podcasts",
                column: "ResumenId");

            migrationBuilder.CreateIndex(
                name: "IX_Resumenes_TemarioId",
                table: "Resumenes",
                column: "TemarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Podcasts");

            migrationBuilder.DropTable(
                name: "Resumenes");
        }
    }
}
