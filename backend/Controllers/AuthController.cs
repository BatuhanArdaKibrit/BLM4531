using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly DataContext context;

        public AuthController(IUserService userService,DataContext context){
            this.userService = userService;
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Response>> Register(UserDto request){
            bool isUserExists = await context.Users.AnyAsync(u => u.Email == request.Email);
            var response = new Response();
            if(isUserExists){
                response.Message="Bu kullanıcı zaten var.";
                return BadRequest(response);
            }
            userService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);    
            User user = new User(){
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            response.Message = "Kullanıcı başarı ile oluşturuldu.";
            return Ok(response);
        }
        [HttpPost("login")]
        public async Task<ActionResult<Response>> Login(UserDto request){
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            var response = new Response();
            if(user == null){
                response.Message = "Böyle bir kullanıcı bulunmamaktadır.";
                return BadRequest(response);
            }
            if(!userService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt)){
                response.Message = "Hatalı şifre";
                return BadRequest(response);
            }
            string token = userService.CreateToken(user);
            response.Token = token;
            return Ok(response);
        }

    }
}