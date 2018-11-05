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
        }
    }
}
