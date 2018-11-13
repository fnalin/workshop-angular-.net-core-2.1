using FN.WorkShopAngularNetCore.Domain.Entities;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Domain.Contracts.Repositories
{
    public interface IUsuarioRepository: IRepository<Usuario>
    {
        Task<Usuario> GetByEmailAsync(string email);
    }
}
