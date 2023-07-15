using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IDocAddress
    {
        public Task<Address> GetAddressByClinicId(int id);
    }
}
