using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedtheAdress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "AppMechanics",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "AppGarages",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_AppMechanics_AddressId",
                table: "AppMechanics",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_AppGarages_AddressId",
                table: "AppGarages",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppGarages_AppAddresses_AddressId",
                table: "AppGarages",
                column: "AddressId",
                principalTable: "AppAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppMechanics_AppAddresses_AddressId",
                table: "AppMechanics",
                column: "AddressId",
                principalTable: "AppAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppGarages_AppAddresses_AddressId",
                table: "AppGarages");

            migrationBuilder.DropForeignKey(
                name: "FK_AppMechanics_AppAddresses_AddressId",
                table: "AppMechanics");

            migrationBuilder.DropIndex(
                name: "IX_AppMechanics_AddressId",
                table: "AppMechanics");

            migrationBuilder.DropIndex(
                name: "IX_AppGarages_AddressId",
                table: "AppGarages");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "AppMechanics");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "AppGarages");
        }
    }
}
