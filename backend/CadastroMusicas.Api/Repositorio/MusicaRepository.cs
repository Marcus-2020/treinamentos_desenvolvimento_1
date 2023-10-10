using MySql.Data.MySqlClient;
using CadastroMusica.Api.Entidades;

namespace CadastroMusicas.Api.Repository
{
    public class MusicaRepository
    {
        private readonly string _connectionString;

        public MusicaRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MySqlConnection");
        }

        public void Add(Musica musica)
        {   
            MySqlConnection conexao = null;
            try{
                conexao = new MySqlConnection(_connectionString);
                var sql = "INSERT INTO musica (nome, nome_album, autor_album, ano_album) VALUES (@nome, @nome_album, @autor_album, @ano_album)";
                MySqlCommand comando = new MySqlCommand(sql, conexao);   
                
                comando.Parameters.AddWithValue("@nome",musica.nome); 
                comando.Parameters.AddWithValue("@nome_album",musica.nomeAlbum); 
                comando.Parameters.AddWithValue("@autor_album",musica.autorAlbum); 
                comando.Parameters.AddWithValue("@ano_album",musica.anoAlbum); 
                
                conexao.Open();
                comando.ExecuteNonQuery();
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
    }
}