using System.Linq;

namespace Model
{
    public class DBIntitializer
    {
        public static void Initialize(LibraryContext context)
        {
            //Create the db if not yet exists
            context.Database.EnsureCreated();

            //Are there already books present ?
            if (!context.Ingredients.Any())
            {
                var apple = new Ingredient()
                {
                    Name = "Apple",
                    Calories = 50,
                    Fat = 5,
                    Sugars = 7
                };
                context.Ingredients.Add(apple);
                var Carrot = new Ingredient()
                {
                    Name = "Carrot",
                    Calories = 25,
                    Fat = 4,
                    Sugars = 2
                };
                context.Ingredients.Add(Carrot);
                var Patato = new Ingredient()
                {
                    Name = "Patato",
                    Calories = 35,
                    Fat = 10,
                    Sugars = 1
                };
                context.Ingredients.Add(Carrot);
                var Ananas = new Ingredient()
                {
                    Name = "Ananas",
                    Calories = 35,
                    Fat = 10,
                    Sugars = 1
                };
                context.Ingredients.Add(Ananas);

                //Create new book
                var Meal = new Meal()
                {
                    Name = "spaghetti",
                    Ingredients = { Carrot, Patato }
                };
                //Add the book to the collection of books
                context.Meals.Add(Meal);
                Meal = new Meal()
                {
                    Name = "Pizza",
                    Ingredients = { apple, Ananas }

                };
                context.Meals.Add(Meal);
                //Save all the changes to the DB
                context.SaveChanges();
            }
        }
    }
}