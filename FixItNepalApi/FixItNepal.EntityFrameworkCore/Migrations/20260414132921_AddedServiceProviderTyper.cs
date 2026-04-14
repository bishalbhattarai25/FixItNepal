using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedServiceProviderTyper : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ServiceProviderType",
                table: "AppServiceRequests",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceProviderType",
                table: "AppServiceRequests");
        }
    }
}
