using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Conduit.Api.Dto.User
{
    public class UserDto
    {
        public string Email { get; set; }

        public string Username { get; set; }

        public string Bio { get; set; }
    }
}