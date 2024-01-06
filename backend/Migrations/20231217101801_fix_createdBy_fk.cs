using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class fix_createdBy_fk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Users_CreatedBy",
                table: "Foods");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_Name",
                table: "Users");

            migrationBuilder.Sql("ALTER TABLE \"Foods\"ALTER COLUMN \"CreatedBy\" TYPE INTEGER USING NULL;");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Users_CreatedBy",
                table: "Foods",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Users_CreatedBy",
                table: "Foods");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Foods",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_Name",
                table: "Users",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Users_CreatedBy",
                table: "Foods",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
