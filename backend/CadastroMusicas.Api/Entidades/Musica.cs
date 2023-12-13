namespace CadastroMusicas.Api.Entidades
{
    public class Musica
    {
        public int id { get; set; }
        public string? nomeAlbum { get; set; }
        public string? autorAlbum { get; set; }
        public int anoAlbum { get; set; }

        private string _nome = string.Empty;
        public string nome
        {
            get
            {
                return _nome ?? string.Empty;
            }
            set
            {
                _nome = value;
            }
        }
    }
}