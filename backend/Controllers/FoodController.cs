using System.IO.Compression;
using System.Net.Mime;
using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("api/[controller]"),Authorize]
    [ApiController]
    public class FoodController : Controller
    {
        private readonly DataContext context;

        private readonly IFoodService foodService;

        public FoodController(DataContext context,IFoodService foodService)
        {
            this.context = context;
            this.foodService = foodService;
        }
        [HttpPost]
        public async Task<ActionResult<Response>> SaveFood([FromForm] FoodDtoReq request){
            var response = new Response();
            Food food = new Food();
            int userId = await context.Users.Where(u => u.Email == request.CreatedBy).Select(u => u.Id).FirstOrDefaultAsync();
            var Ingredients = request.Ingredients.Split(',').ToList();
            IFormFile image = request.Image;
            using (MemoryStream ms = new MemoryStream())
            {
                image.CopyTo(ms);
                byte[] imageBytes = ms.ToArray();
                food.Image = imageBytes;
            }
            food.Name = request.Name;
            food.Type = request.Type;
            food.Recipe = request.Recipe;
            food.CreatedBy = userId;
            food.Ingredients = Ingredients;
            food.ImageName = request.ImageName;
            
            await context.Foods.AddAsync(food);
            await context.SaveChangesAsync();
            response.Message = "Yemek başarılı bir şekilde kaydedilmiştir.";
            return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDtoRes>> GetFoodById(int id,[FromQuery] string email){
            Food? food = await context.Foods.FirstOrDefaultAsync(f => f.Id == id);
            int userId = await context.Users.Where(u => u.Email == email).Select(u => u.Id).FirstOrDefaultAsync();
            if(food is null){
                return BadRequest();
            }
            FoodDtoRes fdto = new FoodDtoRes(){
                    Id=food.Id,
                    Name=food.Name,
                    Type = food.Type,
                    Recipe = food.Recipe,
                    Ingredients = string.Join(',',food.Ingredients),
                    CreatedBy = await context.Users.Where(u => u.Id==food.CreatedBy).Select(u=>u.Name).FirstOrDefaultAsync(),
                    Image = Convert.ToBase64String(food.Image),
                    ImageType = foodService.GetImageType(food.Image),
                    ImageName = food.ImageName,
                    IsLiked = await context.UserFoodLikes.Where(u=>u.UserId == userId && u.FoodId == food.Id).AnyAsync(),
                    IsDeleteable = userId == food.CreatedBy ? true:false
            };
            return Ok(fdto);
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<FoodDtoRes>>> GetAllFood([FromQuery] string email){
            int userId = await context.Users.Where(u=>u.Email == email).Select(u=> u.Id).FirstOrDefaultAsync();
            var AllFoods = await context.Foods.ToListAsync();
            List<FoodDtoRes> response = new List<FoodDtoRes>();
            foreach (var food in AllFoods)
            {
                FoodDtoRes fdto = new FoodDtoRes(){
                    Id=food.Id,
                    Name=food.Name,
                    Type = food.Type,
                    Recipe = food.Recipe,
                    Ingredients = string.Join(',',food.Ingredients),
                    CreatedBy = await context.Users.Where(u => u.Id==food.CreatedBy).Select(u=>u.Name).FirstOrDefaultAsync(),
                    Image = Convert.ToBase64String(food.Image),
                    ImageType = foodService.GetImageType(food.Image),
                    ImageName = food.ImageName,
                    IsLiked = await context.UserFoodLikes.Where(u=>u.UserId == userId && u.FoodId == food.Id).AnyAsync()
                };
                response.Add(fdto);
            }
            return Ok(response);
        }

        [HttpGet("user")]
        public async Task<ActionResult<List<FoodDtoRes>>> GetUserFoods([FromQuery] string email){
            User? user = await context.Users.Include(u => u.ListFoods).FirstOrDefaultAsync(u=>u.Email == email);
            
            if (user is null){
                return BadRequest();
            }
            var UserFoods = user.ListFoods;
            List<FoodDtoRes> response = new List<FoodDtoRes>();
            foreach (var food in UserFoods)
            {
                FoodDtoRes fdto = new FoodDtoRes(){
                Id = food.Id,
                Name=food.Name,
                Type = food.Type,
                Recipe = food.Recipe,
                Ingredients = string.Join(',',food.Ingredients),
                CreatedBy = await context.Users.Where(u => u.Id==food.CreatedBy).Select(u=>u.Name).FirstOrDefaultAsync(),
                Image = Convert.ToBase64String(food.Image),
                ImageType = foodService.GetImageType(food.Image),
                ImageName = food.ImageName,
                IsLiked = await context.UserFoodLikes.Where(u=>u.UserId == user.Id && u.FoodId == food.Id).AnyAsync()
                };
                response.Add(fdto);
            }
            return Ok(response);
        }
        [HttpPost("like")]
        public async Task<ActionResult<Response>> LikeFood([FromBody]FoodLikeDto request){
            Response response = new Response();
            UserFoodLike ufl = new UserFoodLike(){
                UserId = await context.Users.Where(u => u.Email == request.Email).Select(u => u.Id).FirstOrDefaultAsync(),
                FoodId = request.FoodId
            };
            await context.UserFoodLikes.AddAsync(ufl);
            await context.SaveChangesAsync();
            response.Message = "Yemek begenilmistir";
            return Ok(response);
        }
        [HttpPost("dislike")]
          public async Task<ActionResult<Response>> DislikeFood([FromBody]FoodLikeDto request){
            Response response = new Response();
            var userId = await context.Users.Where(u => u.Email == request.Email).Select(u => u.Id).FirstOrDefaultAsync();
            UserFoodLike? ufl = await context.UserFoodLikes.Where(ufl => ufl.UserId == userId && ufl.FoodId == request.FoodId).FirstOrDefaultAsync();
            if(ufl is null){
                response.Message = "Yemegi begenilenlerden çıkartırken bir hata oluştu.";
                return BadRequest(response);
            }
              context.UserFoodLikes.Remove(ufl);
            await context.SaveChangesAsync();
            response.Message = "Yemek begenilenlerden çıkartılmıştır.";
            return Ok(response);
        }
        [HttpGet("like")]
        public async Task<ActionResult<List<FoodDtoRes>>> GetLikedFoods([FromQuery] string email){
            User? user = await context.Users.Include(u => u.LikedFoods).FirstOrDefaultAsync(u=>u.Email == email);
            if (user is null){
                return BadRequest();
            }
            var ListofLiked = user.LikedFoods;
            List<Food>LikedFoods = new List<Food>();
            foreach (var lol in ListofLiked)
            {
                Food? food = await context.Foods.Where(f => f.Id == lol.FoodId).FirstOrDefaultAsync();
                if(food != null){
                    LikedFoods.Add(food);
                }
            }
            List<FoodDtoRes>response = new List<FoodDtoRes>();
            foreach (var food in LikedFoods)
            {
                FoodDtoRes fdto = new FoodDtoRes(){
                Id = food.Id,
                Name=food.Name,
                Type = food.Type,
                Recipe = food.Recipe,
                Ingredients = string.Join(',',food.Ingredients),
                CreatedBy = await context.Users.Where(u => u.Id==food.CreatedBy).Select(u=>u.Name).FirstOrDefaultAsync(),
                Image = Convert.ToBase64String(food.Image),
                ImageType = foodService.GetImageType(food.Image),
                ImageName = food.ImageName,
                IsLiked = await context.UserFoodLikes.Where(u=>u.UserId == user.Id && u.FoodId == food.Id).AnyAsync()
                };
                response.Add(fdto);
            }
            return Ok(response);
        }
        [HttpGet("{id}/check_ownership")]
        public async Task<ActionResult<Object>> CheckOwnership(int id){
            int? userId = await context.Foods.Where(f => f.Id == id).Select(f => f.CreatedBy).FirstOrDefaultAsync();
            if(userId is null){
                return BadRequest();
            }
            string? email = await context.Users.Where(u => u.Id == userId).Select(u=>u.Email).FirstOrDefaultAsync();
            if(email is null){
                return BadRequest();
            }
            return Ok(email);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteRecipe(int id){
            Response response = new Response();
            Food? food = await context.Foods.FirstOrDefaultAsync(f => f.Id == id);
            if(food is null){ return BadRequest(); }
            context.Foods.Remove(food);
            await context.SaveChangesAsync();
            response.Message = "Tarif başarılı bir şekilde silinmiştir.";
            return Ok(response);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Response>> EditFood(int id,[FromForm] FoodDtoReq request){
            Console.WriteLine(request);
            var response = new Response();
            Food? food = await context.Foods.FirstOrDefaultAsync(f => f.Id == id);
            if (food is null) {return BadRequest();}
            int userId = await context.Users.Where(u => u.Email == request.CreatedBy).Select(u => u.Id).FirstOrDefaultAsync();
            var Ingredients = request.Ingredients.Split(',').ToList();
            IFormFile image = request.Image;
            using (MemoryStream ms = new MemoryStream())
            {
                image.CopyTo(ms);
                byte[] imageBytes = ms.ToArray();
                food.Image = imageBytes;
            }
            food.Name = request.Name;
            food.Type = request.Type;
            food.Recipe = request.Recipe;
            food.CreatedBy = userId;
            food.Ingredients = Ingredients;
            food.ImageName = request.ImageName;
            await context.SaveChangesAsync();
            response.Message = "Yemek başarılı bir şekilde düzenlenmiştir.";
            return Ok(response);
        }
    }
}