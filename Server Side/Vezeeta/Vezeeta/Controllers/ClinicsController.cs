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
using Vezeeta.DTO.ClinicDTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicsController : ControllerBase
    {
        private readonly IEntityRepository<Clinic> ClinicRepos;

        public ClinicsController(IEntityRepository<Clinic> _ClinicRepos)
        {
            ClinicRepos = _ClinicRepos;
        }

        // GET: api/Clinics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clinic>>> GetClinics()
        {
            List<Clinic> clinics = await ClinicRepos.GetAll();
            if (clinics == null)
            {
                return NotFound();
            }
            return Ok(clinics);
        }

        // GET: api/Clinics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clinic>> GetClinic(int id)
        {
            Clinic clinic = await ClinicRepos.GetById(id);
            if (clinic == null)
            {
                return BadRequest();
            }
            return Ok(clinic);
        }

        // PUT: api/Clinics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClinic(int id, ClinicDTO clinic)
        {
            Clinic ReturnedClinic;
            Clinic oldClinic = await ClinicRepos.GetById(id);
            if (oldClinic == null) { return BadRequest(); }
            try
            {
                oldClinic.name = clinic.name;
                oldClinic.phone = clinic.phone;
                ReturnedClinic = await ClinicRepos.Update(id, oldClinic);
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }
            if (ReturnedClinic == null) { return BadRequest(); }
            return Ok(ReturnedClinic);

        }

        // POST: api/Clinics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Clinic>> PostClinic(ClinicDTO clinicDTO)
        {
            if (clinicDTO == null) return BadRequest();
            Clinic clinic = new Clinic()
            {
                id = clinicDTO.id,
                name = clinicDTO.name,
                phone = clinicDTO.phone,
            };
            Clinic returnedClinic = await ClinicRepos.Add(clinic);
            if (returnedClinic == null)
                return BadRequest();
            return Ok(returnedClinic);

        }

        // DELETE: api/Clinics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClinic(int id)
        {
            await ClinicRepos.DeleteById(id);
            return NoContent();
        }

    }
}
