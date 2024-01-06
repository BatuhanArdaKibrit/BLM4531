using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using backend.Services;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controllers
{
    [Route("api/[controller]"),Authorize]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IUserService userService;
        private readonly DataContext context;

        public AccountController(IUserService userService,DataContext context)
        {
            this.userService = userService;
            this.context = context;
        }
        [HttpPut("name")]
        public  async Task<ActionResult<Response>> ChangeName(UserDto request){
            var response = new Response();
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if(user == null){
                response.Message = "Bir hata meydana geldi.";
                return BadRequest(response);
            }
            user.Name = request.Name;
            await context.SaveChangesAsync();
            string token = userService.CreateToken(user);
            response.Token = token;
            response.Message = "İsim başarılı bir şekilde kaydedilmiştir.";
            return Ok(response);
        }
        [HttpPut("email")]
        public  async Task<ActionResult<Response>> ChangeEmail(UserDto request){
            var response = new Response();
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Old_Email);
            if(user == null){
                response.Message = "Bir hata meydana geldi.";
                return BadRequest(response);
            }
            bool isUserExists = await context.Users.AnyAsync(u => u.Email == request.Email);
            if(isUserExists){
                response.Message = "Bu e-posta kullanılmaktadır.";
                return BadRequest(response);
            }
            user.Email = request.Email;
            await context.SaveChangesAsync();
            string token = userService.CreateToken(user);
            response.Token = token;
            response.Message = "E-posta başarılı bir şekilde kaydedilmiştir.";
            return Ok(response);
        }
        [HttpPut("passwd")]
        public  async Task<ActionResult<Response>> ChangePassword(UserDto request){
            var response = new Response();
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if(user == null){
                response.Message = "Bir hata meydana geldi.";
                return BadRequest(response);
            }
            if(!userService.VerifyPasswordHash(request.Old_Password, user.PasswordHash, user.PasswordSalt)){
                response.Message = "Hatalı eski şifre.";
                return BadRequest(response);
            }
            userService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);    
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await context.SaveChangesAsync();
            string token = userService.CreateToken(user);
            response.Token = token;
            response.Message = "Şifre başarılı bir şekilde kaydedilmiştir.";
            return Ok(response);
        }
        [HttpDelete("{email}")]
        public async Task<ActionResult<Response>> DeleteUser(string email){
            Response response = new Response();
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(user is null){return BadRequest();}
            context.Users.Remove(user);
            await context.SaveChangesAsync();
            response.Message = "Kullanıcı başarılı bir şekilde silinmiştir.";
            return Ok(response);
        }
    }
}