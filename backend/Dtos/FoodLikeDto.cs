using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class FoodLikeDto
    {
        public int FoodId { get; set; }
        public string Email { get; set; }=string.Empty;
    }
}