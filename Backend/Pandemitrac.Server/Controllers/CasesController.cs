using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Controllers
{
    public class CasesController : BaseController
    {
        public CasesController(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        [HttpPost]
        public async Task<IActionResult> PostCaseAsync([FromBody] Case @case)
        {
            await DatabaseContext.Cases.AddAsync(@case);
            await DatabaseContext.SaveChangesAsync();
            return Ok(@case);
        }

        [HttpGet]
        public IQueryable<Case> GetCases()
        {
            return DatabaseContext.Cases.AsQueryable();
        }

        [HttpGet]
        public async Task<IActionResult> GetCaseAsync(int id)
        {
            var @case = await DatabaseContext.Cases.FindAsync(id);
            if (@case == null)
                return NotFound();
            return Ok(@case);
        }
    }
}