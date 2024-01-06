using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class createdBy_foreignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_Name",
                table: "Users",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_CreatedBy",
                table: "Foods",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Users_CreatedBy",
                table: "Foods",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Users_CreatedBy",
                table: "Foods");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_Name",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Foods_CreatedBy",
                table: "Foods");
        }
    }
}
