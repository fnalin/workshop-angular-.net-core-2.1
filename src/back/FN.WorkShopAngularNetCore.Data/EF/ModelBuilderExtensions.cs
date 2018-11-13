using FN.WorkShopAngularNetCore.Domain.Helpers;
using Microsoft.EntityFrameworkCore;

namespace FN.WorkShopAngularNetCore.Data.EF
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Domain.Entities.Cliente>().HasData(
                new Domain.Entities.Cliente(1, "Raphael Akyu", "Nalin", 19, Domain.Enums.Sexo.Masculino),
                new Domain.Entities.Cliente(2, "Fabiano Alberto", "Nalin", 39, Domain.Enums.Sexo.Masculino),
                new Domain.Entities.Cliente(3, "Priscila", "Mitui", 40, Domain.Enums.Sexo.Feminino)
            );

            modelBuilder.Entity<Domain.Entities.Usuario>().HasData(
                new Domain.Entities.Usuario(1, "Admin", "admin@fansoft.com.br", "123456".Encrypt()),
                new Domain.Entities.Usuario(2, "User", "user@fansoft.com.br", "7890".Encrypt())
            );
        }
    }
}
