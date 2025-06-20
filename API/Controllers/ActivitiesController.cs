using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetAllActivities()
    {
        // return all activities from the database
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")] // {id} is a route parameter
    public async Task<ActionResult<Activity>> GetActivityById(string id)
    {
        // return a specific activity by id
        var activity = await context.Activities.FindAsync(id);
        if (activity == null) return NotFound(); // return 404 if not found
        return activity; // return the activity
    }
}
