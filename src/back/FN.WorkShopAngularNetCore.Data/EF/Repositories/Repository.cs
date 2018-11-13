using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Data.EF.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        protected readonly WorkShopAngularNetCoreDataContext _ctx;
        private readonly DbSet<TEntity> _db;

        public Repository(WorkShopAngularNetCoreDataContext ctx)
        {
            _ctx = ctx;
            _db = ctx.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            _db.Add(entity);
        }


        public void Edit(TEntity entity)
        {
            _db.Update(entity);
        }

        public void Del(TEntity entity)
        {
            _db.Remove(entity);
        }

        public async Task<TEntity> GetAsync(int id)
        {
            return await _db.FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAsync()
        {
            return await _db.ToListAsync();
        }
    }
}
