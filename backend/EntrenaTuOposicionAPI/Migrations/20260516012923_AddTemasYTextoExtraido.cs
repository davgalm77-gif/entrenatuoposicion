using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EntrenaTuOposicionAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTemasYTextoExtraido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Temas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Titulo = table.Column<string>(type: "text", nullable: false),
                    Contenido = table.Column<string>(type: "text", nullable: false),
                    Orden = table.Column<int>(type: "integer", nullable: false),
                    TemarioId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Temas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Temas_Temarios_TemarioId",
                        column: x => x.TemarioId,
                        principalTable: "Temarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Temas_TemarioId",
                table: "Temas",
                column: "TemarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Temas");
        }
    }
}
