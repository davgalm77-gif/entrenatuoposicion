using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EntrenaTuOposicionAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixTemasYTextoExtraido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TextoExtraido",
                table: "Temarios",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TextoExtraido",
                table: "Temarios");
        }
    }
}
