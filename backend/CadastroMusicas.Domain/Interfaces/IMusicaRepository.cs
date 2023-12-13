namespace CadastroMusicas.Domain.Interfaces
{
    public interface IMusicaRepository
    {
        List<Musica> Get();
        void Add(Musica musica);
        void Update(Musica musica);
        void Delete(int id);
    }
}