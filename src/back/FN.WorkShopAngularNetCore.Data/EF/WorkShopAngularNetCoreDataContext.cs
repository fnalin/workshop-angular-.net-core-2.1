using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FN.WorkShopAngularNetCore.Data.EF
{
    public class WorkShopAngularNetCoreDataContext : DbContext
    {
        private readonly IConfiguration _config;
        public WorkShopAngularNetCoreDataContext(IConfiguration config)
        {
            _config = config;
            Database.EnsureCreated();
        }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("WorkShopAngularNetCoreConn"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new Maps.ClienteMap());
            modelBuilder.ApplyConfiguration(new Maps.UsuarioMap());
            modelBuilder.Seed();
        }

    }
}
