using CadastroMusicas.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CadastroMusicas.Data
{
    public static class DependecyInjection
    {
        public static void AddData(this IServiceCollection services)
        {
            services.AddScoped<IMusicaRepository, MusicaRepository>();
        }
    }
}