using Microsoft.EntityFrameworkCore;

namespace Model
{
    public class CookBook : DbContext
    {
        public CookBook(DbContextOptions<CookBook> options) : base(options)
        {
        }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
    }
}

