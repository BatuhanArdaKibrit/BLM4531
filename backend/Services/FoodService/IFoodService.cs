using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.FoodService
{
    public interface IFoodService
    {
        public string GetImageType(byte[] imageByte);
    }
}