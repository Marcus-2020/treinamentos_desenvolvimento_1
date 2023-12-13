using CadastroMusicas.Domain.Interfaces;
using CadastroMusicas.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CadastroMusicas.Domain
{
    public static class DependencyInjection
    {
        public static void AddDomain(this IServiceCollection services)
        {
            services.AddScoped<IMusicaService, MusicaService>();
        }
    }
}