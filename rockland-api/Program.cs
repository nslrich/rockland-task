using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
// app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}

// API route for uploading pdf file
app.MapPost("/api/upload", async ([FromForm] FileUploadModel uploadedFile) => {

  // Check for file
  if (uploadedFile == null) {

    // No file
    return Results.BadRequest("No File");
  } else {
    try {

      // Can do whatever with file data, for demo I will save it the temp folder located in this directory

      // Setup File Details
      var fileDetails = new FileDetails() {
        FileName = uploadedFile.FileName,
      };

      // Save file to temp path
      string path = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "temp"), fileDetails.FileName);
      await using var fs = File.Open(path, FileMode.Create);
      await uploadedFile.File.CopyToAsync(fs);

      // All good.
      return Results.Ok("Success");

    } catch (Exception) {

      // Something went wrong.
      return Results.BadRequest("Error saving file");
    }
  }
})
.DisableAntiforgery()  // Disable for this exercise (ideally we would setup some anti forgery token)
.WithName("UploadFile")
.WithOpenApi();

app.Run();

public class FileUploadModel {
  public required IFormFile File { get; set; }
  public required string FileName { get; set; }
}

public class FileDetails {
  public required string FileName { get; set; }
  public byte[]? FileData { get; set; }
}