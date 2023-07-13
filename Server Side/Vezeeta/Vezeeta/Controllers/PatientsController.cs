using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.DTO.patientDTO;
using System.Xml.Linq;
using Vezeeta.IEntities;
using System.Security.Cryptography;
using Vezeeta.Repository.doctor;
using System.Numerics;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IEntityRepository<Patient> context;
        private readonly IUpdateAccountRepo<Patient> contextUpdat;
        IPatientQuetions pqcontext;

        public PatientsController(IEntityRepository<Patient> _context , IUpdateAccountRepo<Patient> _contextUpdat, IPatientQuetions _pqcontext)
        {
            context = _context;
            contextUpdat = _contextUpdat;
            pqcontext = _pqcontext;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
          if (context == null)
          {
              return NotFound();
          }
          return await context.GetAll();
           
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            Patient? patient = await context.GetById(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updatePatient(int id, addPatientDTO patientdto)
        {
            if (patientdto == null)
                return BadRequest();  
           
            Patient p = await context.GetById(id);
            if (p==null) return BadRequest();
            if (p.id != id) return NotFound();
            try {
                p.name = patientdto.patientName; 

                if (await contextUpdat.GetByPhone(patientdto.patientPhone) == null)
                {
                    p.phone = patientdto.patientPhone;
                }
                if (await contextUpdat.GetByMail(patientdto.patientEmail) == null ) 
                {
                    p.email = patientdto.patientEmail;
                }
                
                p.birth_date = patientdto.patientBirth_date;
                p.gender = patientdto.patientGender;
                p.address=patientdto.patientAddress;
                p.password=patientdto.patientPassword; 
                 Patient patientUpdate = await context.Update(id, p); 

                if (patientUpdate != null)
                    return Ok(p);
                return BadRequest();
            }
            catch (Exception e) { return BadRequest(e.Message); }
        
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> addPatient(addPatientDTO patientDTO)
        {
            if (patientDTO == null)
            {
                return BadRequest();
            }
            try
            {
                // Hash the password 
         //  var hashedPassword =  contextUpdat.HashPassword(patientDTO.patientPassword);

                Patient p = new Patient() { 
                    name = patientDTO.patientName,
                    gender = patientDTO.patientGender,
                    email = patientDTO.patientEmail,
                    phone = patientDTO.patientPhone,
                    birth_date = patientDTO.patientBirth_date,
                    address = patientDTO.patientAddress,
                  password=patientDTO.patientPassword,
                    //  password = hashedPassword,
                };
                bool test = await contextUpdat.phoneValidation(p.phone);
                if (test)
                {
                  await  context.Add(p);
               //     return Ok(p); 
                 return CreatedAtAction("GetPatient", new { id = p.id }, p);

                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


     

        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeletePatient(int id)
        { 
                await context.DeleteById(id);
                return Ok();
          
        }


        [HttpPost("{password}")]
        public async Task<ActionResult<Patient>> LoginPatient(patientLoginDTO userLog)
        { 
           // string LoginPasswordAfterHash = contextUpdat.HashPassword(userLog.Password);

            Patient patientByMail = await contextUpdat.GetByMail(userLog.Email);
            Patient patientByPhone = await contextUpdat.GetByPhone(userLog.Phone);

            if (patientByMail != null || patientByPhone != null) // login by mail or phone  
            {

                if (patientByMail != null && patientByMail.password ==userLog.Password)
                    return Ok();

                if (patientByPhone != null && patientByPhone.password == userLog.Password)

                    return Ok();
                return NotFound("password don't matched");
            }
            else
                return BadRequest("Invalid email or phone.");
              
        }

        [HttpGet]
        [Route("Questions/{id}")]
        public async Task<ActionResult<Patient>> GetPatientWithQuestions(int id)
        {
            Patient? patient = await pqcontext.GetPatientWithQuetions(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }
        [HttpGet("{email}")]
        public async Task<ActionResult<Patient>> GetPatientByMail(string email)
        {
            Patient? patient = await contextUpdat.GetByMail(email);
            if (patient == null)
            {
                return NotFound(" لم نتمكن من العثور على حسابك بإستخدام هذا البريد الإلكتروني");
            }
            return Ok(patient);
        }

    }
}
