using Microsoft.AspNet.OData.Routing;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Controllers
{
    [ODataRoutePrefix("cases")]
    public class CasesController : ODataBaseController<Case>
    {
        public CasesController(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}