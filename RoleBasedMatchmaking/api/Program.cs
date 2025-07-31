using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json");

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddScoped<RoleDashboard.Managers.ActiveDirectoryManager>();
builder.Services.AddScoped<RoleDashboard.Services.ConfigurationService>();
builder.Services.AddDbContext<RoleDashboard.Contexts.RolePipelineContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("monet"))
    .UseSnakeCaseNamingConvention());

var app = builder.Build();

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
