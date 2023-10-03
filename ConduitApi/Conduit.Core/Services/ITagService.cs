using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conduit.Core.Models;

namespace Conduit.Core.Services
{
    public interface ITagService
    {
        Task<IEnumerable<Tag>> GetTags();
    }
}