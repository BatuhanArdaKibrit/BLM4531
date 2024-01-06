using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.UserService
{
    public interface IUserService
    {
        string GetMyName();
        public string CreateToken(User user);
        public void CreatePasswordHash(string password,out byte[] passwordHash, out byte[] passwordSalt);
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);

    }
}