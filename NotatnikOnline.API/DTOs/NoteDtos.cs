
using System.ComponentModel.DataAnnotations;

namespace NotatnikOnline.API.DTOs;

public class NoteDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Content { get; set; }
    public bool IsPublic { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UserId { get; set; } = string.Empty;
}

public class CreateNoteDto
{
    [Required]
    public string Title { get; set; } = string.Empty;
    public string? Content { get; set; }
    public bool IsPublic { get; set; }
}

public class UpdateNoteDto
{
    [Required]
    public string Title { get; set; } = string.Empty;
    public string? Content { get; set; }
    public bool IsPublic { get; set; }
}
