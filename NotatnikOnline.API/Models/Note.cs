
using System.ComponentModel.DataAnnotations;

namespace NotatnikOnline.API.Models;

public class Note
{
    public Guid Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? Content { get; set; }
    
    public bool IsPublic { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    [Required]
    public string UserId { get; set; } = string.Empty;

    public ApplicationUser User { get; set; } = null!;
}
