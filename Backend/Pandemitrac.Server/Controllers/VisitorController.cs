using System.Collections.Generic;
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
        /// Erstellt einen alleinstehenden Besucher
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <returns>Ok</returns>
        [HttpPost("create")]
        public async Task<IActionResult> CreateVisitor(Visitor visitor) {
            await _visitorManager.CreateVisitorAsync(visitor);
            return Ok(visitor);
        }

        /// <summary>
        /// Legt einen neuen Besucher an, welcher zu einem Fall gehört
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <returns>Ok</returns>
        [HttpPost("createDepending")]
        public async Task<IActionResult> CreateVisitor([FromBody] Visitor visitor, [FromQuery] int caseId)
        {
            await _visitorManager.CreateDependingVisitorAsync(visitor, caseId);
            return Ok(visitor);
        }

        [HttpGet]
        public IEnumerable<Visitor> GetVisitors() {
            return DatabaseContext.Visitors;
        }
    }

}