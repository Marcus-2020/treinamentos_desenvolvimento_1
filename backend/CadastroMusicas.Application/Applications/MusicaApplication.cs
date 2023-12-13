using CadastroMusicas.Domain;
using CadastroMusicas.Domain.Interfaces;

namespace CadastroMusicas.Application.Applications
{
    public class MusicaApplication
    {
        private readonly IMusicaService _musicaService;
        public MusicaApplication(IMusicaService musicaService)
        {
            _musicaService = musicaService;
        }
        public List<Musica> GetAll()
        {
            return _musicaService.GetAll();
        }
    }
}