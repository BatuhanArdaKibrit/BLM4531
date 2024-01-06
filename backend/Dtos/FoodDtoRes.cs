using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class FoodDtoRes
    {
        public int Id {get;set;}
        public string Name { get; set; }=string.Empty;
        public string Type { get; set; }=string.Empty;
        public string Image { get; set; }=string.Empty;
        public string ImageName {get;set;}=string.Empty;
        public string? ImageType {get;set;}=string.Empty;
        public bool IsLiked {get;set;} = false;
        public bool IsDeleteable {get;set;} = false;
        public string Recipe { get; set; }=string.Empty;
        public string Ingredients {get; set;}=string.Empty;
        public string? CreatedBy {get;set;}=string.Empty;
    }
}