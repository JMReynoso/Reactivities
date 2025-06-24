using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            // Add the activity to the database
            context.Activities.Add(request.Activity);
            // Save changes to the database
            await context.SaveChangesAsync(cancellationToken);
            // Return the ID of the created activity to the client
            return request.Activity.Id;
        }
    }
}
