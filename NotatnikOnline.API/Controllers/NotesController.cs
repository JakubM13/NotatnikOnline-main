
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotatnikOnline.API.Data;
using NotatnikOnline.API.DTOs;
using NotatnikOnline.API.Models;

namespace NotatnikOnline.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NotesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var notes = await _context.Notes
            .Where(n => n.UserId == userId || n.IsPublic)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NoteDto
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                IsPublic = n.IsPublic,
                CreatedAt = n.CreatedAt,
                UpdatedAt = n.UpdatedAt,
                UserId = n.UserId
            })
            .ToListAsync();

        return Ok(notes);
    }

    [HttpGet("public")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetPublicNotes()
    {
        var notes = await _context.Notes
            .Where(n => n.IsPublic)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NoteDto
            {
                Id = n.Id,
                Title = n.Title,
                Content = n.Content,
                IsPublic = n.IsPublic,
                CreatedAt = n.CreatedAt,
                UpdatedAt = n.UpdatedAt,
                UserId = n.UserId
            })
            .ToListAsync();

        return Ok(notes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NoteDto>> GetNote(Guid id)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var note = await _context.Notes.FindAsync(id);

        if (note == null)
            return NotFound();

        if (!note.IsPublic && note.UserId != userId)
            return Forbid();

        return new NoteDto
        {
            Id = note.Id,
            Title = note.Title,
            Content = note.Content,
            IsPublic = note.IsPublic,
            CreatedAt = note.CreatedAt,
            UpdatedAt = note.UpdatedAt,
            UserId = note.UserId
        };
    }

    [HttpPost]
    public async Task<ActionResult<NoteDto>> CreateNote(CreateNoteDto dto)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var note = new Note
        {
            Title = dto.Title,
            Content = dto.Content,
            IsPublic = dto.IsPublic,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Notes.Add(note);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetNote),
            new { id = note.Id },
            new NoteDto
            {
                Id = note.Id,
                Title = note.Title,
                Content = note.Content,
                IsPublic = note.IsPublic,
                CreatedAt = note.CreatedAt,
                UpdatedAt = note.UpdatedAt,
                UserId = note.UserId
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(Guid id, UpdateNoteDto dto)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var note = await _context.Notes.FindAsync(id);

        if (note == null)
            return NotFound();

        if (note.UserId != userId)
            return Forbid();

        note.Title = dto.Title;
        note.Content = dto.Content;
        note.IsPublic = dto.IsPublic;
        note.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(Guid id)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var note = await _context.Notes.FindAsync(id);

        if (note == null)
            return NotFound();

        if (note.UserId != userId)
            return Forbid();

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
