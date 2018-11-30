using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Data.EF.Repositories
{
    public class RefreshTokenRepository : Repository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(WorkShopAngularNetCoreDataContext ctx) : base(ctx){}

        public async Task<RefreshToken> GetAsync(int userId, string token)
        {
            return await _ctx.RefreshToken.FindAsync(userId, token);
        }

        public async Task<RefreshToken> GetByUserIdAsync(int userId)
        {
            return await _ctx.RefreshToken.FirstOrDefaultAsync(data => data.UsuarioId == userId);
        }
    }
}
