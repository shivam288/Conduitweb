using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conduit.Core.Models;

namespace Conduit.Core.Services
{
    public interface ITokenManager
    {
        string GenerateToken(string email, int id);
        string GetUserEmail();
        int GetUserId();
    }
}