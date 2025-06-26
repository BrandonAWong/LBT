namespace RoleDashboard.Models.DTO
{
    public class TitleDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public TitleDetailDto(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}