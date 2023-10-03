using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conduit.Core.Models
{
    public class User
    {
        public User()
        {
            Articles = new List<Article>();
            Followers = new List<User>();
            Following = new List<User>();
            Comments = new List<Comment>();
            FavoriteArticles = new List<Article>();
        }

        public int UserId { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Bio { get; set; }

        public string Password { get; set; }

        public ICollection<Article> Articles { get; set; }

        public ICollection<User> Followers { get; set; }

        public ICollection<User> Following { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Article> FavoriteArticles { get; set; }
    }
}