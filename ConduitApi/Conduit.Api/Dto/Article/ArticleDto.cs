using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conduit.Api.Dto.Profile;

namespace Conduit.Api.Dto.Article
{
    public class ArticleDto
    {
        public string Slug { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Body { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public ProfileDto Author { get; set; }

        public bool Favorited { get; set; }

        public int FavoritesCount { get; set; }

        public virtual IEnumerable<string> Tags { get; set; }
    }
}