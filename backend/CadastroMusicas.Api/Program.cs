using Microsoft.AspNetCore.Mvc;
using CadastroMusicas.Api.Entidades;
using CadastroMusicas.Api.Repository;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(builder => 
{ 
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddScoped<MusicaRepository>();

var app = builder.Build();

app.UseCors();

app.MapGet("/api/musica", ([FromServices]MusicaRepository repository) => {
    return repository.Get();
});

app.MapGet("/api/musica/{id}", ([FromServices]MusicaRepository repository, int id) => {
    return repository.Get(id);
});

app.MapPost("/api/musica", ([FromServices]MusicaRepository repository, [FromBody]Musica musica) => {
    repository.Add(musica);
    return musica;
});

app.MapPut("/api/musica", ([FromServices]MusicaRepository repository, [FromBody]Musica musica) => {
    repository.Update(musica);
    return musica;
});

app.MapDelete("/api/musica/{id}", ([FromServices]MusicaRepository repository, int id) => {
    repository.Delete(id);
});

app.Run();
