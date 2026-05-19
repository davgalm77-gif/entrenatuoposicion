using Microsoft.AspNetCore.Mvc;

namespace EntrenaTuOposicionAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Backend funcionando");
    }
}