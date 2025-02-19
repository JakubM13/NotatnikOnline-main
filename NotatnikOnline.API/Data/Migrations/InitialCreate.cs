
using Microsoft.EntityFrameworkCore.Migrations;

namespace NotatnikOnline.API.Data.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AspNetUsers",
            columns: table => new
            {
                Id = table.Column<string>(nullable: false),
                UserName = table.Column<string>(maxLength: 256, nullable: true),
                NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                Email = table.Column<string>(maxLength: 256, nullable: true),
                NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                EmailConfirmed = table.Column<bool>(nullable: false),
                PasswordHash = table.Column<string>(nullable: true),
                SecurityStamp = table.Column<string>(nullable: true),
                ConcurrencyStamp = table.Column<string>(nullable: true),
                PhoneNumber = table.Column<string>(nullable: true),
                PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                TwoFactorEnabled = table.Column<bool>(nullable: false),
                LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                LockoutEnabled = table.Column<bool>(nullable: false),
                AccessFailedCount = table.Column<int>(nullable: false),
                FullName = table.Column<string>(nullable: true),
                AvatarUrl = table.Column<string>(nullable: true),
                CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                UpdatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUsers", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Notes",
            columns: table => new
            {
                Id = table.Column<Guid>(nullable: false),
                Title = table.Column<string>(nullable: false),
                Content = table.Column<string>(nullable: true),
                IsPublic = table.Column<bool>(nullable: false),
                CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                UpdatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                UserId = table.Column<string>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Notes", x => x.Id);
                table.ForeignKey(
                    name: "FK_Notes_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Notes_UserId",
            table: "Notes",
            column: "UserId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Notes");

        migrationBuilder.DropTable(
            name: "AspNetUsers");
    }
}
