using System.Security.Claims;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IConfiguration conf;

        public UserService(IHttpContextAccessor httpContextAccessor,IConfiguration conf)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.conf = conf;
        }


        public string GetMyName()
        {
            var result = string.Empty;
            if(httpContextAccessor != null){
                result = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            }
            return result;
        }

        public string CreateToken(User user){
            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Name,user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(conf.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key , SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        public void CreatePasswordHash(string password,out byte[] passwordHash, out byte[] passwordSalt){
            using(var hmac = new HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt){
            using(var hmac = new HMACSHA512(passwordSalt)){
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}