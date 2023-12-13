using CadastroMusicas.Domain;
using CadastroMusicas.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace CadastroMusicas.Data;

public class MusicaRepository : IMusicaRepository
{
    private readonly string _connectionString;

    public MusicaRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("MySqlConnection");
    }
    public List<Musica> Get()
    {
        MySqlConnection conexao = null;
        try
        {
            List<Musica> musicas = new List<Musica>();
            conexao = new MySqlConnection(_connectionString);
            var sql = @"
                  SELECT * FROM musica  
                ";
            MySqlCommand comando = new MySqlCommand(sql, conexao);
            conexao.Open();
            MySqlDataReader reader = comando.ExecuteReader();
            while (reader.Read())
            {
                musicas.Add(new Musica
                {
                    id = Convert.ToInt32(reader["musica_id"]),
                    nome = reader["nome"].ToString(),
                    nomeAlbum = reader["nome_album"].ToString(),
                    autorAlbum = reader["autor_album"].ToString(),
                    anoAlbum = Convert.ToInt32(reader["ano_album"])
                });
            }

            return musicas;
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            conexao?.Close();
        }
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
