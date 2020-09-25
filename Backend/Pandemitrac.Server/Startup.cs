using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Pandemitrac.Server.Logic;
using Pandemitrac.Server.Logic.Input;
using Pandemitrac.Server.Models;

namespace Pandemitrac.Server
{
    public class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<VisitorManager>();

            services.AddSwaggerGen();
            services.AddControllers();
            services.AddDbContext<DatabaseContext>(o =>
            {
                o.UseMySql(Configuration.GetConnectionString("dbConnectionString"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Startup>>();
                CreateDatabase(scope.ServiceProvider, dbContext, logger);
            }

            app.UseSwaggerConfig();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void CreateDatabase(IServiceProvider scope, DatabaseContext dbContext, ILogger logger)
        {
            try
            {
                if (dbContext.Database.EnsureCreated())
                {
                    logger.LogInformation("Datenbank erzeugt");
                    var mocker = ActivatorUtilities.CreateInstance<Mocker>(scope);
                    mocker.Mock();
                    logger.LogInformation("Mockdaten erzeugt");
                }
            }
            catch (Exception e)
            {
                logger.LogInformation("Versuche erneut");
                Thread.Sleep(100);
                // Erneut versuchen
                CreateDatabase(scope, dbContext, logger);
            }
        }
    }
}
