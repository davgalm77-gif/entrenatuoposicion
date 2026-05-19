using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EntrenaTuOposicionAPI.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarTemarios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArchivoOriginalPath",
                table: "Temarios",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ArchivoProcesadoPath",
                table: "Temarios",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Paginas",
                table: "Temarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "ProcesadoPDF",
                table: "Temarios",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TemasDetectados",
                table: "Temarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArchivoOriginalPath",
                table: "Temarios");

            migrationBuilder.DropColumn(
                name: "ArchivoProcesadoPath",
                table: "Temarios");

            migrationBuilder.DropColumn(
                name: "Paginas",
                table: "Temarios");

            migrationBuilder.DropColumn(
                name: "ProcesadoPDF",
                table: "Temarios");

            migrationBuilder.DropColumn(
                name: "TemasDetectados",
                table: "Temarios");
        }
    }
}
