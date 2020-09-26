using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Logic.Core;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Controllers
{
    [ODataRoutePrefix("cases")]
    public class CasesController : ODataBaseController<Case>
    {
        private DependentSubjectManager DependentSubjectManager { get; }

        public CasesController(DatabaseContext databaseContext, DependentSubjectManager dependentSubjectManager) : base(databaseContext)
        {
            DependentSubjectManager = dependentSubjectManager;
        }

        [ODataRoute("({key})/status(subjectId={subjectId})")]
        [HttpGet]
        public async Task<IActionResult> GetDependentSubjectStatus([FromODataUri] int key, int subjectId)
        {
            var @case = await FindEntityAsync(key);
            if (@case == null)
                return NotFound();
            var stateEntry = await DependentSubjectManager.GetDependentSubjectStateAsync(subjectId);
            return Ok(stateEntry);
        }

        [HttpPost("/api/case/updateDependentSubjectStatus")]
        public async Task<IActionResult> UpdateDependentSubjectStatus([FromQuery] int caseId, [FromQuery] int subjectId, [FromQuery] string state)
        {
            var @case = await FindEntityAsync(caseId);
            if (@case == null)
                return NotFound();
            var subject = @case.DependentSubjects.FirstOrDefault(s => s.Id == subjectId);
            if (subject == default(DependentSubject))
                return NotFound();
            var stateWrapper = await DependentSubjectManager.CreateStateWrapper(subject);
            var parsedState = Enum.Parse<DependentSubjectState>(state);
            await stateWrapper.Set(parsedState);
            return Updated(subject);
        }
    }
}