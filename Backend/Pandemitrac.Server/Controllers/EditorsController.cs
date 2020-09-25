using Microsoft.AspNet.OData.Routing;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Controllers
{
    [ODataRoutePrefix("editors")]
    public class EditorsController : ODataBaseController<Editor>
    {
        public EditorsController(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}