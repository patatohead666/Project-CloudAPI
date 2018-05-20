using System.Collections.Generic;
using Newtonsoft.Json;


namespace Model
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public int Fat { get; set; }
        public int Sugars { get; set; }

    }
}
