using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conduit.Core.Services;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Conduit.Service
{
    public class PasswordManager : IPasswordManager
    {
        public string GeneratePassword(string password)
        {
            string salt = GenerateSalt();
            return HashPassword(password, salt) + salt;
        }

        public bool VerifyPassword(string password, string passwordInDb)
        {
            string salt = passwordInDb.Substring(passwordInDb.Length - 24);
            return HashPassword(password, salt) + salt == passwordInDb;
        }

        private string GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = RandomNumberGenerator.Create())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        private string HashPassword(string password, string salt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));
        }
    }
}