using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Logic.Core;
using Pandemitrac.Server.Logic.Input;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Controllers
{
    [ODataRoutePrefix("visitors")]
    public class VisitorController : ODataBaseController<Visitor>
    {
        private readonly VisitorManager _visitorManager;
        private readonly DependentSubjectManager _dependentSubjectManager;

        public VisitorController(DatabaseContext db, VisitorManager visitorManager, DependentSubjectManager dependentSubjectManager) : base(db)
        {
            _visitorManager = visitorManager;
            _dependentSubjectManager = dependentSubjectManager;
        }

        [ODataRoute]
        public override async Task<IActionResult> Create([FromBody] Visitor visitor)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (await _visitorManager.CreateVisitorAsync(visitor))
            {
                return Created(visitor);
            }
            else
            {
                return StatusCode(208, visitor);
            }
        }

        /// <summary>
        /// Legt einen neuen Besucher an, welcher zu einem Fall gehört
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <param name="caseId">ID des Falls</param>
        /// <returns>Ok</returns>
        [HttpPost("/api/visitor/createDepending")]
        public async Task<IActionResult> CreateVisitor([FromBody] Visitor visitor, [FromQuery] int caseId)
        {
            await _visitorManager.CreateDependingVisitorAsync(visitor, caseId);
            return Ok(visitor);
        }
    }

}