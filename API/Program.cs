using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(); //adds header to our HTTP response to allow other apps to access our API
builder.Services.AddMediatR(option =>
    option.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly); // registers all mapping profiles in the assembly

var app = builder.Build();

// Configure the HTTP request pipeline (middleware).
//configure our CORS since we added it to our service. 
//since our React app is on localhost:3000, configure it in the WithOrigins() method
app.UseCors(options => options
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000")
);
app.MapControllers(); // this provides routing for the controllers

using var scope = app.Services.CreateScope(); // disposes unused resources that is no longer in scope
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync(); // apply any pending migrations to the database before starting the app
    await DbInitializer.SeedData(context); // seed the database with values defined in DbInitializer file
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
