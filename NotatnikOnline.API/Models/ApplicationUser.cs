
using Microsoft.AspNetCore.Identity;

namespace NotatnikOnline.API.Models;

public class ApplicationUser : IdentityUser
{
    public string? FullName { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}
