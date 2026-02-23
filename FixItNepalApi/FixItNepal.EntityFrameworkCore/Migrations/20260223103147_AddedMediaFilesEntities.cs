using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixItNepal.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedMediaFilesEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LogoId",
                table: "AppMechanics",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "LogoId",
                table: "AppGarages",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "AppGarageMediaFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    GarageId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MediaFileId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppGarageMediaFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppGarageMediaFiles_AppGarages_GarageId",
                        column: x => x.GarageId,
                        principalTable: "AppGarages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppGarageMediaFiles_AppMediaFiles_MediaFileId",
                        column: x => x.MediaFileId,
                        principalTable: "AppMediaFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AppMechanicMediaFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MechanicId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MediaFileId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppMechanicMediaFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppMechanicMediaFiles_AppMechanics_MechanicId",
                        column: x => x.MechanicId,
                        principalTable: "AppMechanics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppMechanicMediaFiles_AppMediaFiles_MediaFileId",
                        column: x => x.MediaFileId,
                        principalTable: "AppMediaFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AppMechanics_LogoId",
                table: "AppMechanics",
                column: "LogoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppGarages_LogoId",
                table: "AppGarages",
                column: "LogoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppGarageMediaFiles_GarageId",
                table: "AppGarageMediaFiles",
                column: "GarageId");

            migrationBuilder.CreateIndex(
                name: "IX_AppGarageMediaFiles_MediaFileId",
                table: "AppGarageMediaFiles",
                column: "MediaFileId");

            migrationBuilder.CreateIndex(
                name: "IX_AppMechanicMediaFiles_MechanicId",
                table: "AppMechanicMediaFiles",
                column: "MechanicId");

            migrationBuilder.CreateIndex(
                name: "IX_AppMechanicMediaFiles_MediaFileId",
                table: "AppMechanicMediaFiles",
                column: "MediaFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppGarages_AppMediaFiles_LogoId",
                table: "AppGarages",
                column: "LogoId",
                principalTable: "AppMediaFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppMechanics_AppMediaFiles_LogoId",
                table: "AppMechanics",
                column: "LogoId",
                principalTable: "AppMediaFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppGarages_AppMediaFiles_LogoId",
                table: "AppGarages");

            migrationBuilder.DropForeignKey(
                name: "FK_AppMechanics_AppMediaFiles_LogoId",
                table: "AppMechanics");

            migrationBuilder.DropTable(
                name: "AppGarageMediaFiles");

            migrationBuilder.DropTable(
                name: "AppMechanicMediaFiles");

            migrationBuilder.DropIndex(
                name: "IX_AppMechanics_LogoId",
                table: "AppMechanics");

            migrationBuilder.DropIndex(
                name: "IX_AppGarages_LogoId",
                table: "AppGarages");

            migrationBuilder.DropColumn(
                name: "LogoId",
                table: "AppMechanics");

            migrationBuilder.DropColumn(
                name: "LogoId",
                table: "AppGarages");
        }
    }
}
