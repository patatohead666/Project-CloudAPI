using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

namespace RestAPI.Controllers
{
    [Route("api/v1/ingredients")]

    public class IngredientController : Controller
    {
        private readonly CookBook context;

        public IngredientController(CookBook context)
        {
            this.context = context;
        }

        [HttpGet]         // api/v1/ingredients
        public List<Ingredient> GetAllIngredients(string name, int? page, string sort, int length = 2, string dir = "asc")
        {
            IQueryable<Ingredient> query = context.Ingredients;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "calories":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Calories);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Calories);
                        break;
                    case "fat":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Fat);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Fat);
                        break;
                    case "sugar":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Sugars);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Sugars);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.ToList();
        }

        [Route("{id}")]   // api/v1/ingredients/2
        [HttpGet]
        public IActionResult GetIngredients(int id)
        {
            var ingredient = context.Ingredients
                        .SingleOrDefault(d => d.Id == id);
                        //.Include(d => d.Author)


            if (ingredient == null)
                return NotFound();

            return Ok(ingredient);
        }
    }
}
