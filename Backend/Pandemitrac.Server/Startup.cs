using System;
using System.Linq;
using System.Threading;
using MailKit.Net.Smtp;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Microsoft.OData.Edm;
using Pandemitrac.Server.Logic;
using Pandemitrac.Server.Logic.Core;
using Pandemitrac.Server.Logic.Input;
using Pandemitrac.Server.Logic.Mail;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

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
            services.AddTransient<ISmtpClient, SmtpClient>();
            services.AddScoped<MailService>();
            services.AddScoped<DependentSubjectManager>();
            services.AddScoped<VisitorManager>();
            services.AddSwaggerGen();
            services.AddControllers();
            services.AddOData();
            services.AddMvcCore(options =>
            {
                foreach (var outputFormatter in options.OutputFormatters.OfType<OutputFormatter>().Where(x => x.SupportedMediaTypes.Count == 0))
                {
                    outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }

                foreach (var inputFormatter in options.InputFormatters.OfType<InputFormatter>().Where(x => x.SupportedMediaTypes.Count == 0))
                {
                    inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
            });
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
                endpoints.MapODataRoute("OData", "odata", BuildEdmModel(new ODataConventionModelBuilder()))
                    .Count().Expand().Filter().OrderBy().MaxTop(null).Select();
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
            catch (Exception)
            {
                logger.LogInformation("Versuche erneut");
                Thread.Sleep(1000);
                // Erneut versuchen
                CreateDatabase(scope, dbContext, logger);
            }
        }

        private IEdmModel BuildEdmModel(ODataModelBuilder builder)
        {
            builder.EntitySet<Case>("cases");
            builder.EntitySet<Editor>("editors");
            builder.EntitySet<Visitor>("visitors");
            return builder.GetEdmModel();
        }
    }
}
