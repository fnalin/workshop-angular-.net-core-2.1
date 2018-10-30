using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FN.WorkShopAngularNetCore.Data.EF.Maps
{
    public class ClienteMap : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable(nameof(Cliente));
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).ValueGeneratedOnAdd();

            builder.Property(c => c.Nome).IsRequired().HasColumnType("varchar(80)");
            builder.Property(c => c.Sobrenome).IsRequired().HasColumnType("varchar(80)");
            builder.Ignore(c => c.NomeCompleto);
            builder.Property(c => c.Idade).HasColumnType("int");

        }
    }
}
