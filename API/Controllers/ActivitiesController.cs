using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetAllActivities()
    {
        // return all activities from the database via the application layer
        // Mediator is from BaseAPIController, which is inherited by ActivitiesController
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")] // {id} is a route parameter
    public async Task<ActionResult<Activity>> GetActivityById(string id)
    {
        return await Mediator.Send(new GetActivityById.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        // return the ID of the created activity
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    [HttpPut]
    public async Task<IActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command { Activity = activity });

        return NoContent();
    }

    [HttpDelete("{id}")] // {id} is a route parameter
    public async Task<IActionResult> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command { Id = id });

        return Ok();
    }
}
