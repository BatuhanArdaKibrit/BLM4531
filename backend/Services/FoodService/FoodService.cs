using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;

namespace backend.Services.FoodService
{
    public class FoodService : IFoodService
    {
        public string? GetImageType(byte[] imageByte){
            if(imageByte is null){
                return null;
            }
            IImageFormat imageFormat = Image.DetectFormat(imageByte);
            return imageFormat.DefaultMimeType;
        }
        
    }
}