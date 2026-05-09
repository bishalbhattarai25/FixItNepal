using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedOpeningHour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "ScheduledTime",
                table: "AppServiceRequests",
                type: "time(6)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppOpeningHours",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ServiceProviderId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ServiceProviderType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    IsItClosed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    MaxAppointmentsPerSlot = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppOpeningHours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppOpeningHours_AppGarages_ServiceProviderId",
                        column: x => x.ServiceProviderId,
                        principalTable: "AppGarages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AppOpeningHours_ServiceProviderId",
                table: "AppOpeningHours",
                column: "ServiceProviderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppOpeningHours");

            migrationBuilder.DropColumn(
                name: "ScheduledTime",
                table: "AppServiceRequests");
        }
    }
}
