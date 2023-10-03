using Microsoft.AspNetCore.Mvc;
using CadastroMusicas.Api.Entidades;
using CadastroMusicas.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(builder => 
{ 
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddScoped<MusicaRepository>();

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => "Hello World!");

app.MapPost("/api/musica", (MusicaRepository repository, [FromBody]Musica musica) => {
    repository.Add(musica);
    return musica;
});

app.Run();
