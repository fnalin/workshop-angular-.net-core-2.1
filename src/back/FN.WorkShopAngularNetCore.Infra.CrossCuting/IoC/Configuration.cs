using Microsoft.Extensions.DependencyInjection;

namespace FN.WorkShopAngularNetCore.Infra.CrossCuting.IoC
{
    public class Configuration
    {
        public static void RegisterServices(IServiceCollection services)
        {
            registerData(services);

        }

        private static void registerData(IServiceCollection services)
        {
            services.AddScoped<Data.EF.WorkShopAngularNetCoreDataContext>();
            services.AddTransient<Domain.Contracts.Infra.IUnitOfWork, Data.EF.UnitOfWork>();

            services.AddTransient<Domain.Contracts.Repositories.IClienteRepository, Data.EF.Repositories.ClienteRepository>();
            services.AddTransient<Domain.Contracts.Repositories.IUsuarioRepository, Data.EF.Repositories.UsuarioRepository>();
            services.AddTransient<Domain.Contracts.Repositories.IRefreshTokenRepository, Data.EF.Repositories.RefreshTokenRepository>();
        }
    }
}
