using GCO.TR.Contrats.Contexte;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Serilog.Context;

namespace GCO.PR.Controllers
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class LogController : Controller
    {
        private readonly ILogger _log = Log.ForContext<LogController>();

        public LogController()
        {
        }

        [HttpPost]
        public IActionResult Error([FromForm] string url, [FromForm] string message)
        {
            _log.Error("Client JS - {url} - {msg}", url, message);

            return Ok();
        }

        [HttpPost]
        public IActionResult Information([FromForm] string url, [FromForm] string message)
        {
            _log.Information("Client JS - {url} - {msg}", url, message);

            return Ok();
        }
    }
}
