using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedSchduledOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedBudget",
                table: "AppServiceRequests",
                type: "decimal(65,30)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VehicleModel",
                table: "AppServiceRequests",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "VehicleType",
                table: "AppServiceRequests",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedBudget",
                table: "AppServiceRequests");

            migrationBuilder.DropColumn(
                name: "VehicleModel",
                table: "AppServiceRequests");

            migrationBuilder.DropColumn(
                name: "VehicleType",
                table: "AppServiceRequests");
        }
    }
}
