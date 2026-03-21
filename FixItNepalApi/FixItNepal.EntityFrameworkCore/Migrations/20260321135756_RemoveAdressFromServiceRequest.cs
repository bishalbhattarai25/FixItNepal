using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAdressFromServiceRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppServiceRequests_AppAddresses_AddressId",
                table: "AppServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_AppServiceRequests_AddressId",
                table: "AppServiceRequests");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "AppServiceRequests");

            migrationBuilder.AddColumn<Point>(
                name: "LocationCoordinatePoint",
                table: "AppServiceRequests",
                type: "point srid 4326",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocationCoordinatePoint",
                table: "AppServiceRequests");

            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "AppServiceRequests",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_AppServiceRequests_AddressId",
                table: "AppServiceRequests",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppServiceRequests_AppAddresses_AddressId",
                table: "AppServiceRequests",
                column: "AddressId",
                principalTable: "AppAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
