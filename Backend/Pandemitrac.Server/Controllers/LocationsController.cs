using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Controllers
{
    [ODataRoutePrefix("locations")]
    public class LocationsController : ODataBaseController<Location>
    {
        private IEqualityComparer<Location> LocationComparer { get; }

        public LocationsController(DatabaseContext databaseContext, IEqualityComparer<Location> locationComparer) : base(databaseContext)
        {
            LocationComparer = locationComparer;
        }

        [ODataRoute]
        [HttpPost]
        public override async Task<IActionResult> Create(Location location)
        {
            var existingLocation = await Task.Run<Location>(() => GetEntitySet().FirstOrDefault(l => LocationComparer.Equals(l, location)));
            if (existingLocation != default(Location))
                return StatusCode(208, existingLocation);
            return await base.Create(location);
        }
    }
}