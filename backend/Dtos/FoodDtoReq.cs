using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class FoodDtoReq
    {
        public string Name { get; set; }=string.Empty;
        public string Type { get; set; }=string.Empty;
        public IFormFile Image { get; set; }
        public string ImageName {get;set;}=string.Empty;
        public string Recipe { get; set; }=string.Empty;
        public string Ingredients {get; set;}=string.Empty;
        public string? CreatedBy {get;set;}=string.Empty;
    }
}