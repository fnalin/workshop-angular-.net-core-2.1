using FN.WorkShopAngularNetCore.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Domain.Contracts.Repositories
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        Task<TEntity> GetAsync(int id);
        Task<IEnumerable<TEntity>> GetAsync();

        void Add(TEntity entity);
        void Edit(TEntity entity);
        void Del(TEntity entity);
    }
}
