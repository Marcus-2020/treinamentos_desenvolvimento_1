using CadastroMusicas.Api.Entidades;
using CadastroMusicas.Api.Musicas;
using CadastroMusicas.Application.Applications;
using CadastroMusicas.Infra;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(builder => 
{ 
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddApplicationServices();


// ------------------------------------------------------------------------------------------

var app = builder.Build();

app.UseCors();

app.MapGet("/api/musica", ([FromServices]MusicaApplication musicaApplication) => {
    return musicaApplication.GetAll();
});

/* app.MapPost("/api/musica", ([FromServices]MusicaApplication musicaApplication, [FromBody]Musica musica) => {
    musicaApplication.Add(musica);
    return musica;
});

app.MapPut("/api/musica", ([FromServices]MusicaApplication musicaApplication, [FromBody]Musica musica) => {
    musicaApplication.Update(musica);
    return musica;
});

app.MapDelete("/api/musica/{id}", ([FromServices]MusicaApplication musicaApplication, int id) => {
    musicaApplication.Delete(id);
}); */

app.Run();
