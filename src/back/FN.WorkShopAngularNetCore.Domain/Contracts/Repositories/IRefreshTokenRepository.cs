using FN.WorkShopAngularNetCore.Domain.Entities;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Domain.Contracts.Repositories
{
    public interface IRefreshTokenRepository: IRepository<RefreshToken>
    {

        Task<RefreshToken> GetAsync(int userId, string token);
        Task<RefreshToken> GetByUserIdAsync(int userId);
    }
}