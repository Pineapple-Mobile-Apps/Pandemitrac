using Microsoft.AspNetCore.Mvc;

namespace Pandemitrac.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Ping() {
            return StatusCode(418);
        }

    }

}