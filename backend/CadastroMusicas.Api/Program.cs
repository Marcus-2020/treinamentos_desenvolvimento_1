using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(builder => 
{ 
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => "Hello World!");

app.MapPost("/api/musica", ([FromBody]Musica musica) => musica);

app.Run();

public class Musica
{
    public string? nome { get; set; }
    public string? nomeAlbum { get; set; }
    public string? autorAlbum { get; set; }
    public int anoAlbum { get; set; }
}