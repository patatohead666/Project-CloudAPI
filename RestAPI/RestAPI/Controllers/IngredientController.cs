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


            if (ingredient == null)
                return NotFound();

            return Ok(ingredient);
        }

        [HttpPost]
        public IActionResult CreateIngredient([FromBody] Ingredient newIngredient)
        {
            //Book toevoegen in de databank, Id wordt dan ook toegekend
            context.Ingredients.Add(newIngredient);
            context.SaveChanges();
            // Stuur een result 201 met het boek als content
            return Created("", newIngredient);
        }

        [Route("{id}")]   // api/v1/ingredients/2
        [HttpPost]
        public IActionResult UpdateIngredient([FromBody] Ingredient updateIngredient, int id)
        {
            var orgIngredient = context.Ingredients.Find(id);
            if (orgIngredient == null)
                return NotFound();

            orgIngredient.Name = updateIngredient.Name;
            orgIngredient.Calories = updateIngredient.Calories;
            orgIngredient.Fat = updateIngredient.Fat;
            orgIngredient.Sugars = updateIngredient.Sugars;

            context.SaveChanges();
            return Ok(orgIngredient);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteIngredient(int id)
        {
            var ingredient = context.Ingredients.Find(id);
            if (ingredient == null)
                return NotFound();

            //book verwijderen ..
            context.Ingredients.Remove(ingredient);
            context.SaveChanges();
            //Standaard response 204 bij een gelukte delete
            return NoContent();
        }
    }
}
