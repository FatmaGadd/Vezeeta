using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.DTO.DoctorDTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        IEntityRepository<Doctor> doctorRepository;

        public DoctorsController(IEntityRepository<Doctor> _doctorRepository)
        {
            doctorRepository = _doctorRepository;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            IEnumerable<Doctor> doctors = await doctorRepository.GetAll();
            if (doctors == null)
            {
                return NotFound();
            }
            return Ok(doctors);
        }

        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            Doctor doctor = await doctorRepository.GetById(id);
            if (doctor == null)
            {
                return NotFound();
            }
            return Ok(doctor);
        }

        // PUT: api/Doctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, DoctorDTO doctor)
        {
            if (doctor == null)
                return BadRequest();
            Doctor oldDr = await doctorRepository.GetById(id);
            if (oldDr == null)
                return BadRequest("no user");
            try
            {
                var getbyEmail = doctorRepository.GetAll().Result.FirstOrDefault(d => d.email == doctor.email);
                if (getbyEmail == null)
                    oldDr.email = doctor.email;
                else if (getbyEmail.email != oldDr.email)
                    return BadRequest("email found");


                oldDr.password = doctor.password;
                oldDr.birth_date = doctor.birth_date;
                oldDr.name = doctor.name;
                oldDr.description = doctor.description;
                oldDr.id_specialize = doctor.id_specialize;
                oldDr.gender = doctor.gender;
                oldDr.waiting_time = doctor.waiting_time;
                oldDr.verification = doctor.verification;
                oldDr.experience = doctor.experience;
                oldDr.online_fees = doctor.online_fees;
                
            }
            catch (DbUpdateException e) { return BadRequest(e.Message); }
            Doctor newDr = await doctorRepository.Update(id, oldDr);

            if (newDr != null)
                return Ok(doctor);
            return BadRequest();
        }

        // POST: api/Doctors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(DoctorDTO doctor)
        {
            if (doctor == null)
                return BadRequest();

            Doctor dr = new Doctor()
            {
                id = doctor.id,
                name = doctor.name,
                email = doctor.email,
                verification = doctor.verification,
                image = doctor.image,
                id_specialize = doctor.id_specialize,
                waiting_time = doctor.waiting_time,
                description = doctor.description,
                password = doctor.password,
                gender = doctor.gender,
                experience = doctor.experience,
                online_fees = doctor.online_fees,
                Doctors_Phones=doctor.Doctors_Phones,
            };
            Doctor oldDr = await doctorRepository.Add(dr);
            if (oldDr != null)
                return Ok(dr);
            return BadRequest();
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            await doctorRepository.DeleteById(id);
            return Ok();
        }

    }
}
