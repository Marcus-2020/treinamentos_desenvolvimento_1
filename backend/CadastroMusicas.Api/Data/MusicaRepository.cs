using System.Data;
using MySql.Data.MySqlClient;
using CadastroMusicas.Api.Entidades;

namespace CadastroMusicas.Api.Data
{
    public class MusicaRepository
    {
        private readonly string _connectionString;
        
        public MusicaRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

        public void Add(Musica musica) {
            MySqlConnection conexao = new MySqlConnection(_connectionString);
            
            MySqlCommand comando = new MySqlCommand(
                "INSERT INTO musica (nome, nome_album, autor_album, ano_album) VALUES (@nome, @nomeAlbum, @autorAlbum, @anoAlbum)", 
                conexao);

            DataTable tabela = new DataTable();
            try
            {
                comando.Parameters.AddWithValue("@nome", musica.nome);
                comando.Parameters.AddWithValue("@nomeAlbum", musica.nomeAlbum);
                comando.Parameters.AddWithValue("@autorAlbum", musica.autorAlbum);
                comando.Parameters.AddWithValue("@anoAlbum", musica.anoAlbum);
                conexao.Open();
                comando.ExecuteNonQuery();
            }
            finally
            {
                conexao.Close();
            }
        }
    }
}