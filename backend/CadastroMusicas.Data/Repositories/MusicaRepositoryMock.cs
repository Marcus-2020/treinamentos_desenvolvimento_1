using CadastroMusicas.Domain;
using CadastroMusicas.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace CadastroMusicas.Data;

public class MusicaRepositoryMock : IMusicaRepository
{
    public MusicaRepositoryMock()
    {
    }
    public List<Musica> Get()
    {
        List<Musica> musicas = new();
        musicas.Add(new Musica()
        {
            id = 1,
            nome = "Musica 1",
            autorAlbum = "Autor 1",
            nomeAlbum = "Album 1",
            anoAlbum = 2021
        });
        
        musicas.Add(new Musica()
        {
            id = 2,
            nome = "Musica 2",
            autorAlbum = "Autor 2",
            nomeAlbum = "Album 2",
            anoAlbum = 2021
        });
        musicas.Add(new Musica()
        {
            id = 3,
            nome = "Musica 3",
            autorAlbum = "Autor 3",
            nomeAlbum = "Album 3",
            anoAlbum = 2021
        });
        return musicas;
    }

    public void Add(Musica musica)
    {
        throw new NotImplementedException();
    }

    public void Update(Musica musica)
    {
        throw new NotImplementedException();
    }

    public void Delete(int id)
    {
        throw new NotImplementedException();
    }
}
