using CadastroMusicas.Domain;
using CadastroMusicas.Domain.Interfaces;

namespace CadastroMusicas.Domain.Services
{
    public class MusicaService : IMusicaService
    {
        private readonly IMusicaRepository  _musicaRepository;

        public MusicaService(IMusicaRepository musicaRepository)
        {
            _musicaRepository = musicaRepository;
        }

        public List<Musica> GetAll()
        {
            try
            {
                return _musicaRepository.Get();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}