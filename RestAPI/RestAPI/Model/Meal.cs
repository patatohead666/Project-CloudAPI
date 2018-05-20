﻿using System.Collections.Generic;
using Newtonsoft.Json;


namespace Model
{
    public class Meal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }
    }
}
