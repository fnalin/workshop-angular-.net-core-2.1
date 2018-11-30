using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Api
{
    public class Startup
    {

        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            Infra.CrossCuting.IoC.Configuration.RegisterServices(services);

            services.AddSwaggerGen(s => {
                s.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
                {
                    Title = "WorkShopAngularNetCore - API",
                    Version = "v1"
                });

                // Swagger 2.+ support
                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", new string[] { }},
                };

                s.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "Entre com o token <br>(Não esqueça do <strong>bearer</strong> na frente.)",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                    
                });
                s.AddSecurityRequirement(security);

                // Estava dando exception devido a modelos com a mesmo nome
                // stackoverflow.com/questions/46071513/swagger-error-conflicting-schemaids-duplicate-schemaids-detected-for-types-a-a/46071635
                s.CustomSchemaIds(x => x.FullName);
            });

            //especifica o esquema usado para autenticacao do tipo Bearer
            // e 
            //define configurações como chave,algoritmo,validade, data expiracao...
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,

                    // Verifica se um token recebido ainda é válido
                    ValidateLifetime = true,

                    // Valida a assinatura de um token recebido
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "fansoft.com.br",
                    ValidAudience = "fansoft.com.br",
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_config["SecurityKey"])),


                    // stackoverflow.com/questions/39728519/jwtsecuritytoken-doesnt-expire-when-it-should
                    // Tempo de tolerância para a expiração de um token(utilizado
                    // caso haja problemas de sincronismo de horário entre diferentes
                    // computadores envolvidos no processo de comunicação)
                    ClockSkew = System.TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        //Debug.WriteLine("Token inválido..:. " + context.Exception.Message);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        //Debug.WriteLine("Token válido...: " + context.SecurityToken);
                        return Task.CompletedTask;
                    }
                };
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseCors(options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
            });

            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(s => {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "WorkShopAngularNetCore");
                s.RoutePrefix = "docs";
            });
        }
    }
}
