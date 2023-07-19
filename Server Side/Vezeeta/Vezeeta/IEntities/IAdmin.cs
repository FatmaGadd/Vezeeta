using Vezeeta.DTO.DoctorDTO;
using Vezeeta.Models;

namespace Vezeeta.IEntities
{
    public interface IAdmin
    {
        public Task<Doctor> active(int id,bool state);
        public Task<Doctor> delete(int id, bool state);
        public Task<List<Doctor>> GetdoctorsUnActive();
        public Task<List<Doctor>> GetdoctorsActive();


    }
}
