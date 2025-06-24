using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            // Find the existing activity in the database
            var activity = await context.Activities
                .FindAsync([request.Activity.Id], cancellationToken)
                ?? throw new Exception("Girlie... That activity does not exist!");

            // Update the existing activity with the new values using auto-mapper
            // activity.Title = request.Activity.Title;
            mapper.Map(request.Activity, activity);

            // Save changes to the database
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
