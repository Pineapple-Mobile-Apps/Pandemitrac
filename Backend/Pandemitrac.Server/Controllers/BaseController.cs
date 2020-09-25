using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Models;

namespace Pandemitrac.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public abstract class BaseController
    {
        protected DatabaseContext DatabaseContext { get; }

        public BaseController(DatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }
    }
}