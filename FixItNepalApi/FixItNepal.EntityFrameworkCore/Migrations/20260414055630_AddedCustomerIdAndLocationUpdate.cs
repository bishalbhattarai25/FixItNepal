using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedCustomerIdAndLocationUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ServiceProviderId",
                table: "AppServiceRequests",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                table: "AppServiceRequests",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Point>(
                name: "LastKnownLocationOfServiceProvider",
                table: "AppServiceRequests",
                type: "point srid 4326",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppServiceRequests_CustomerId",
                table: "AppServiceRequests",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppServiceRequests_AppCustomers_CustomerId",
                table: "AppServiceRequests",
                column: "CustomerId",
                principalTable: "AppCustomers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppServiceRequests_AppCustomers_CustomerId",
                table: "AppServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_AppServiceRequests_CustomerId",
                table: "AppServiceRequests");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "AppServiceRequests");

            migrationBuilder.DropColumn(
                name: "LastKnownLocationOfServiceProvider",
                table: "AppServiceRequests");

            migrationBuilder.AlterColumn<Guid>(
                name: "ServiceProviderId",
                table: "AppServiceRequests",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");
        }
    }
}
