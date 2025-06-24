using System;

namespace Domain;

// model for Activity table
public class Activity
{
    // columns of the database under Activity table
    // by default ef will make Id the primary key
    // if wwe want to specify a different column to be a key, 
    // we use [Key] attribute above the property

    // to create migrations based on Domain models, use this command: dotnet ef migrations add InitialCreate -p Persistence -s API
    // to run migration, use this command: dotnet ef database update -p Persistence -s API
    // to drop migration, use this command: dotnet ef database drop -p Persistence -s API
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }

    //locatioon props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public static implicit operator System.Diagnostics.Activity(Activity v)
    {
        throw new NotImplementedException();
    }
}
