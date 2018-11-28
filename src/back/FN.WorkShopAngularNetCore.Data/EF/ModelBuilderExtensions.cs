using Microsoft.EntityFrameworkCore;

namespace FN.WorkShopAngularNetCore.Data.EF
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Domain.Entities.Cliente>().HasData(
                new Domain.Entities.Cliente(1, "Raphael Akyu", "Nalin", 19, Domain.Enums.Sexo.Masculino, "b53848a643e84d478fc2cf20b7da76661.jpg"),
                new Domain.Entities.Cliente(2, "Fabiano Alberto", "Nalin", 39, Domain.Enums.Sexo.Masculino, "b53848a643e84d478fc2cf20b7da76662.jpg"),
                new Domain.Entities.Cliente(3, "Priscila", "Mitui", 40, Domain.Enums.Sexo.Feminino, "b53848a643e84d478fc2cf20b7da76663.jpg")
            );

            modelBuilder.Entity<Domain.Entities.Usuario>().HasData(
                new Domain.Entities.Usuario(1, "Admin", "admin@fansoft.com.br", "123456"),
                new Domain.Entities.Usuario(2, "User", "user@fansoft.com.br", "7890")
            );
        }
    }
}
