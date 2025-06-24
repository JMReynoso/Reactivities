using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityById
{
    // required for MediatR to work
    public class Query : IRequest<Activity>
    {
        public required string Id { get; set; } // Id of the activity to retrieve
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            // Find the activity by Id in the database
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null) throw new Exception("omg girl that activity cannot be found 😭"); // throw exception if not found
            return activity; // return the found activity
        }
    }
}
