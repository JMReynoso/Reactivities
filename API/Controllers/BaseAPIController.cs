using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] // [controller] will be replaced with the name of the controller, e.g. ActivitiesController without the "Controller", so Activities
    [ApiController]
    public class BaseAPIController : ControllerBase
    {
    }
}
