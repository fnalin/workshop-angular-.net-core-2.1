using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Data.EF.Repositories
{
    public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(WorkShopAngularNetCoreDataContext ctx) : base(ctx)
        {}

        public async Task<Usuario> GetByEmailAsync(string email)
        {
            return await _ctx.Usuario.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
