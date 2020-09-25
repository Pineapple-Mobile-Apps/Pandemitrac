using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Logic.Input;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Controllers
{

    public class VisitorController : BaseController
    {
        private readonly VisitorManager _visitorManager;

        public VisitorController(DatabaseContext db, VisitorManager visitorManager) : base(db)
        {
            _visitorManager = visitorManager;
        }

        /// <summary>
        /// Legt einen neuen Besucher an
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <returns>Ok</returns>
        [HttpPost("{caseId}")]
        public async Task<IActionResult> CreateVisitor(Visitor visitor, [FromRoute] int caseId)
        {
            await _visitorManager.CreateVisitorAsync(visitor, caseId);
            return Ok();
        }
    }

}