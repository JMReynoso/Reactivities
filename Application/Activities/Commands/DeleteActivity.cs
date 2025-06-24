using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; } // The specific ID of the activity we want to delete
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            // Find the existing activity in the database
            var activity = await context.Activities
                .FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Girlie... That activity does not exist!");

            context.Remove(activity); // Remove the activity from the context

            await context.SaveChangesAsync(cancellationToken); // Save changes to the database
        }
    }
}
