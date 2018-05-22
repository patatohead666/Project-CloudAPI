using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

namespace RestAPI.Controllers
{
    [Route("api/v1/meals")]

    public class MealController : Controller
    {
        private readonly CookBook context;

        public MealController(CookBook context)
        {
            this.context = context;
        }

        [HttpGet]         // api/v1/meals
        public List<Meal> GetMeals(string name, int? page, string sort, int length = 2, string dir = "asc")
        {
            IQueryable<Meal> query = context.Meals.Include(d=>d.MostUsedIngredient);

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Name);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.ToList();
        }

        [Route("{id}")]   // api/v1/meals/2
        [HttpGet]
        public IActionResult GetMeals(int id)
        {
            var meal = context.Meals.Include(d => d.MostUsedIngredient)
                        .SingleOrDefault(d => d.Id == id);


            if (meal == null)
                return NotFound();

            return Ok(meal);
        }

        [HttpPost]
        public IActionResult CreateMeal([FromBody] Meal newMeal)
        {
            newMeal.MostUsedIngredient = context.Ingredients.SingleOrDefault(d => d.Name == newMeal.MostUsedIngredient.Name);
            if(newMeal.MostUsedIngredient == null)
                return NotFound();
            context.Meals.Add(newMeal);
            context.SaveChanges();
            return Created("", newMeal);
        }

        [Route("{id}")]   // api/v1/meals/2
        [HttpPost]
        public IActionResult UpdateMeal([FromBody] Meal updateMeal, int id)
        {
            var orgMeal = context.Meals.Find(id);
            if(orgMeal == null)
                return NotFound();

            orgMeal.MostUsedIngredient = context.Ingredients.SingleOrDefault(d => d.Name == updateMeal.MostUsedIngredient.Name);
            orgMeal.Name = updateMeal.Name;
            if(orgMeal.MostUsedIngredient == null)
                return NotFound();

            context.SaveChanges();
            return Ok(orgMeal);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteMeal(int id)
        {
            var Meal = context.Meals.Find(id);
            if (Meal == null)
                return NotFound();

            //Meal verwijderen ..
            context.Meals.Remove(Meal);
            context.SaveChanges();
            //Standaard response 204 bij een gelukte delete
            return NoContent();
        }
    }
}