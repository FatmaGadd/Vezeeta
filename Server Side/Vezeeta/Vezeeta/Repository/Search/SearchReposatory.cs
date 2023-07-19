using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq;
using Vezeeta.dbContext;
using Vezeeta.DTO.DoctorDTO;
using Vezeeta.DTO.SearchDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository
{
    public class SearchReposatory : ISearch,IAdmin
    {
        private readonly VezeetaContext context;
        private readonly IAppointment contextAppointment;

        public SearchReposatory(VezeetaContext context,IAppointment con)
        {
            this.context = context;
            this.contextAppointment = con;
        }

         async Task<List<Clinic_Doctor>> GetAll()
        {
            var temp= await context.Clinic_Doctors.Include(a => a.clinic).ThenInclude(a => a.Address)
                .ThenInclude(a => a.city).Include(a => a.Dr).ToListAsync();
                return temp;
                }
        public async Task<List<SearchReturnDTO>> GetAll(SearchDTO search)
        {
            List<Clinic_Doctor> temp =await GetAll();
            if (temp == null) { return null; }
            var appointments = await contextAppointment.Get();

            //      NavigationExpansionExtensibilityHelperDependencies to update database
            if (search.City != 0)
            {
                temp = temp.Where(a => a.clinic.Address.city.id==search.City).ToList();

            }

            if (search.Reigon != 0)
            {
                temp = temp.Where(a => a.clinic.Address.city.region_id==search.Reigon).ToList();

            }
            if (search.Specialization != 0)
            {
                temp = temp.Where(a => a.Dr?.id_specialize==search.Specialization).ToList();
            }
                                

            if (search.Name !="")
            {
                var holder=search.Name.ToLower();
                temp = temp.Where(a => a.Dr.name.ToLower().Contains( holder)).ToList();
            }

            if (search.Gender!="" && (search.Gender.ToLower()=="m"|| search.Gender.ToLower() == "f")) {
                var holder = search.Gender.ToLower();
                temp = temp.Where(a=>a.Dr.gender.ToLower()==holder).ToList();
            }
            temp=temp.Where(a=>a.Dr.is_deleted==false).ToList();
            var list = new List<SearchReturnDTO>();
            foreach (var d in temp)
            {
                var Drappointments = appointments.Where(a => a.Dr_id == d.Dr.id).ToList();

                var x = new SearchReturnDTO()
                {
                    DrID = d.Dr.id,
                    Appointments = Drappointments,
                    Cityid = (int)d?.clinic?.Address?.city_id,
                    Clinic = d.clinic,
                    Clinic_address = d.clinic.Address,
                    Clinic_feese = d.fees,
                    DrName = d.Dr.name,
                    Reigon = (int)d?.clinic?.Address?.city?.region_id,
                    specilalization = d.Dr.id_specialize,
                    WattingTime = d.Dr.waiting_time
                    ,
                    image = d.Dr.image
                };
                list.Add(x);
            }
            
            if (search.Fese != 0 )
            {
                if(search.Fese <=300) {
                    list = list.Where(a => a.Clinic_feese <= (decimal)search.Fese).ToList();

                }
                else
                {
                    list = list.Where(a => a.Clinic_feese > 300).ToList();

                }

            }

            if (search.Date != 0)
            {
                if (search.Date == 1)
                {
                    list = list.Where(a => a.Appointments.Any(B=>B.start_date==DateTime.Now)).ToList();

                }
                else
                {
                    list = list.Where(a => a.Appointments.Any(B => B.start_date == DateTime.Now.AddDays(1))).ToList();


                }

            }

            return list;
        }

        public Task<List<Doctor>> GetdoctorsUnActive()
        {
         return context.Doctors.Where(a=>a.status==false &&a.is_deleted==false).ToListAsync();
        }

        //public async Task<Doctor> UpdateState(int id, bool status)
        //{
        //    Doctor dro = await context.Doctors.FirstOrDefaultAsync(a => a.id == id);
        //    dro.status = status;
        //    context.Entry(dro).State = EntityState.Modified;
        //    await context.SaveChangesAsync();
        //    return dro;
        //}

        public async Task<Doctor> active(int id, bool state)
        {
            Doctor dro = await context.Doctors.FirstOrDefaultAsync(a => a.id == id);
            dro.status = state;
            context.Entry(dro).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return dro;
        }

        public async Task<Doctor> delete(int id, bool state)
        {
            Doctor dro = await context.Doctors.FirstOrDefaultAsync(a => a.id == id);
            dro.is_deleted = state;
            context.Entry(dro).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return dro;
        }

        public Task<List<Doctor>> GetdoctorsActive()
        {
            //return context.Doctors.Where(a => a.status == true && a.is_deleted == false).ToListAsync();
           return context.Doctors.ToListAsync();
        }
    }
}
