using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] // [controller] will be replaced with the name of the controller, e.g. ActivitiesController without the "Controller", so Activities
    [ApiController]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;

        //make mediator available for all controllers
        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("Mediator service is not available."); // ensure that the mediator is available in the request services
    }
}
