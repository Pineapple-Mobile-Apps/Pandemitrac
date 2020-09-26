using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;
using System.Reflection;

namespace Pandemitrac.Server
{
    public static class SwaggerConfigurator
    {
        public static IServiceCollection AddSwaggerConfig(this IServiceCollection services)
        {
            // Versions ermittlung
            var assemblyPath = Assembly.GetExecutingAssembly().Location;
            var fileVersionInfo = FileVersionInfo.GetVersionInfo(assemblyPath);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = fileVersionInfo.ProductName + " API", Version = fileVersionInfo.ProductVersion });
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerConfig(this IApplicationBuilder app)
        {
            app.UseSwagger(c => c.SerializeAsV2 = true);

            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ITHomeAPI"));

            return app;
        }
    }
}
