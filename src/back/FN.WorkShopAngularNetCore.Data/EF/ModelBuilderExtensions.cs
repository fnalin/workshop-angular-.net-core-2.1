using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FN.WorkShopAngularNetCore.Data.EF
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Cliente>().HasData(
                new Cliente(1, "Raphael Akyu", "Nalin", 19),
                new Cliente(2, "Fabiano Alberto", "Nalin", 39),
                new Cliente(3, "Priscila", "Mitui", 40)
            );
        }
    }
}
