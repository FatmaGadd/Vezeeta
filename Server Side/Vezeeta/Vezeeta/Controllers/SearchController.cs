using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Vezeeta.DTO.CityDTO;
using Vezeeta.DTO.SearchDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        ISearch search;
        IAdmin admin;

        public ValuesController(ISearch search,IAdmin admin)
        {
            this.search = search;
            this.admin = admin;

        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<SearchReturnDTO>>> Search(SearchDTO dto)
        {
            IEnumerable<SearchReturnDTO> doctors = await search.GetAll(dto);
            if (doctors == null)
            {
                return NotFound();
            }
            return Ok(doctors);
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Doctor>>> getUNactive()
        {
            IEnumerable<Doctor> doctors = await admin.GetdoctorsUnActive();
            if (doctors == null)
            {
                return NotFound();
            }
            return Ok(doctors);
        }
        [HttpPut("active/{id}")]
        public async Task<IActionResult> PutDocotr(int id)
        {
            
            if(id==0) return NotFound();
          
            try
            {
                Doctor doctor = await admin.active(id, true);
                if (doctor == null) return NotFound();
                return Ok(doctor);
            }
            catch (DbUpdateConcurrencyException)
            {
                    return BadRequest();
            }

            return NoContent();
        }
        [HttpPut("deactive/{id}")]
        public async Task<IActionResult> deactive(int id)
        {

            if (id == 0) return NotFound();

            try
            {
                Doctor doctor = await admin.active(id, false);
                if (doctor == null) return NotFound();
                return Ok(doctor);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }
        [HttpPut("delete/{id}")]
        public async Task<IActionResult> delete(int id)
        {

            if (id == 0) return NotFound();

            try
            {
                Doctor doctor = await admin.delete(id, true);
                if (doctor == null) return NotFound();
                return Ok(doctor);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }
        
        
        [HttpGet("users")]

        public async Task<ActionResult<IEnumerable<Doctor>>> getactive()
        {
            IEnumerable<Doctor> doctors = await admin.GetdoctorsActive();
            if (doctors == null)
            {
                return NotFound();
            }
            return Ok(doctors);
        }
    }
}
