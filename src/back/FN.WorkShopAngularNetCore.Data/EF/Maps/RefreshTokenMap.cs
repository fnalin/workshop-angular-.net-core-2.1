using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FN.WorkShopAngularNetCore.Data.EF.Maps
{
    public class RefreshTokenMap : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.ToTable(nameof(RefreshToken));
            builder.HasKey(c => new { c.UsuarioId, c.Token } );

            builder.Property(c => c.UsuarioId).HasColumnType("int");
            builder.Property(c => c.Token).IsRequired().HasColumnType("char(32)"); //GUID s/ hífen

            /*
             * datetime aloca sempre 8Bytes, o horizonte de datas vai de 1753-01-01 à 9999-12-31 e o tempo com precisão fixa de nanosegundos com incrementos de .000, .003, or .007 segundos, o por quê disso eu vou demonstrar no final desta resposta.
             * datetime2 é a união dos tipos Date e Time (e essa afirmação é verdadeira mesmo na forma em que o DateTime2 é armazenado internamente), que aloca de 6 à 8 bytes dependendo da precisão da fração de segundos. Um horizonte de 1900-01-01 00:00:00.0000000 à 9999-12-31 23:59:59.9999999.
             */
            builder.Property(c => c.DataExpiracao).IsRequired().HasColumnType("datetime2");
            builder.Ignore(c => c.IsValid);

            builder.HasOne(c => c.Usuario).WithOne(c => c.RefreshToken);
        }
    }
}
