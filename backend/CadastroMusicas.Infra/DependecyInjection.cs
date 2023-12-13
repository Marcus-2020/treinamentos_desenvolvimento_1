using CadastroMusicas.Application.Applications;
using CadastroMusicas.Data;
using CadastroMusicas.Domain;
using Microsoft.Extensions.DependencyInjection;

namespace CadastroMusicas.Infra
{
    public static class DependecyInjection
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddData();
            services.AddDomain();

            services.AddScoped<MusicaApplication>();
        }
    }
}