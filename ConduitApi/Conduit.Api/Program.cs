using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Conduit.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    if (!(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development"))
                    {
                        webBuilder.UseUrls($"http://+:{Environment.GetEnvironmentVariable("PORT")}");
                    }
                    webBuilder.UseStartup<Startup>();
                });
    }
}
