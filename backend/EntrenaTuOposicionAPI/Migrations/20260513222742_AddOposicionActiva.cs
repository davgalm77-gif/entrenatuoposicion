using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EntrenaTuOposicionAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddOposicionActiva : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OposicionActivaId",
                table: "Usuarios",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OposicionActivaId",
                table: "Usuarios");
        }
    }
}
