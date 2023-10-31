using MySql.Data.MySqlClient;
using CadastroMusicas.Api.Entidades;

namespace CadastroMusicas.Api.Repository
{
    public class MusicaRepository
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

        public Musica Get(int id) 
        {
            MySqlConnection conexao = null;
            try
            {
                Musica musica = null;
                conexao = new MySqlConnection(_connectionString);
                var sql = @"
                  SELECT * FROM musica WHERE musica_id = @id
                ";
                MySqlCommand comando = new MySqlCommand(sql, conexao);
                comando.Parameters.AddWithValue("@id", id);
                conexao.Open();
                MySqlDataReader reader = comando.ExecuteReader();
                while (reader.Read())
                {
                    musica = new Musica
                    {
                        id = Convert.ToInt32(reader["musica_id"]),
                        nome = reader["nome"].ToString(),
                        nomeAlbum = reader["nome_album"].ToString(),
                        autorAlbum = reader["autor_album"].ToString(),
                        anoAlbum = Convert.ToInt32(reader["ano_album"])
                    };
                }

                return musica;
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

        public void Update(Musica musica)
        {
            MySqlConnection conexao = null;
            try
            {
                conexao = new MySqlConnection(_connectionString);
                var sql = "UPDATE musica SET nome = @nome, nome_album = @nome_album, autor_album = @autor_album, ano_album = @ano_album WHERE id = @id";
                MySqlCommand comando = new MySqlCommand(sql, conexao);

                comando.Parameters.AddWithValue("@nome", musica.nome);
                comando.Parameters.AddWithValue("@nome_album", musica.nomeAlbum);
                comando.Parameters.AddWithValue("@autor_album", musica.autorAlbum);
                comando.Parameters.AddWithValue("@ano_album", musica.anoAlbum);
                comando.Parameters.AddWithValue("@id", musica.id);

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

        public void Delete(int id)
        {
            MySqlConnection? conexao = null;
            try
            {
                conexao = new MySqlConnection(_connectionString);
                var sql = "DELETE FROM musica WHERE musica_id = @id";
                MySqlCommand comando = new MySqlCommand(sql, conexao);

                comando.Parameters.AddWithValue("@id", id);

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