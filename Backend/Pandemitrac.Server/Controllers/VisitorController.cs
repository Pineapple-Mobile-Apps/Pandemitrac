using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Controllers
{

    public class VisitorController : BaseController
    {

        public VisitorController(DatabaseContext db) : base(db) { }

        /// <summary>
        /// Legt einen neuen Besucher an
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <returns>Ok</returns>
        [HttpPost]
        public async Task<IActionResult> CreateVisitor(Visitor visitor)
        {
            DatabaseContext.Visitors.Add(visitor);
            await DatabaseContext.SaveChangesAsync();
            return Ok();
        }
    }

}