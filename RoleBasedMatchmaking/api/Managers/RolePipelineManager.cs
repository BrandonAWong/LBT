using Microsoft.EntityFrameworkCore;
using RoleDashboard.Contexts;
using RoleDashboard.Exceptions;
using RoleDashboard.Models;
using RoleDashboard.Models.DTO;

namespace RoleDashboard.Managers
{
    public class RolePipelineManager
    {
        private readonly RolePipelineContext _context;

        public RolePipelineManager(RolePipelineContext context)
        {
            _context = context;
        }

        internal async Task<List<TitleDetailDto>> GetAllTitles()
        {
            return await _context.TitleDetails
                .Select(td => new TitleDetailDto(td.Id, td.Title))
                .ToListAsync();
        }

        internal async Task<TitleDetail?> GetTitleDetails(string title)
        {
            return await _context.TitleDetails.FirstOrDefaultAsync(td => td.Title.ToLower() == title.ToLower());
        }

        internal async Task<int> CreateTitleDetail(TitleDetail title)
        {
            try
            {
                var newTitle = await _context.AddAsync(title);
                await _context.SaveChangesAsync();
                return newTitle.Entity.Id;
            }
            catch (DbUpdateException e)
            {
                throw new ConflictException("Title is already in use", e);
            }
        }

        internal async Task UpdateTitleDetail(TitleDetail title)
        {
            try
            {
                _context.Update(title);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new ConflictException("Title is already in use", e);
            }
        }

        internal async Task DeleteTitleDetail(int id)
        {
            TitleDetail? record = await _context.TitleDetails.FirstOrDefaultAsync(td => td.Id == id);

            if (record != null)
            {
                _context.TitleDetails.Remove(record);
                await _context.SaveChangesAsync();
            }
        }
    }
}