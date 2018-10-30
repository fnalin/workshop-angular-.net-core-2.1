using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;

namespace FN.WorkShopAngularNetCore.Data.EF.Repositories
{
    public class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(WorkShopAngularNetCoreDataContext ctx) : base(ctx)
        {}

    }
}
