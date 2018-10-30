using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Domain.Contracts.Infra
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
        Task RollBackAsync();

    }
}
