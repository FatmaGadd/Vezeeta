using Vezeeta.DTO.SearchDTO;
using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface ISearch
    {
        public Task<List<SearchReturnDTO>> GetAll(SearchDTO a);
        //public Task<Doctor> UpdateState(int id,bool state);

    }
}
