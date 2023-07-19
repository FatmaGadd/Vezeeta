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
using Vezeeta.DTO.patientDTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Patient_AppoinmentController : ControllerBase
    {
        private readonly IPatientAppiont context;
        private readonly IEntityRepository<Patient> patientContext;

        public Patient_AppoinmentController(IPatientAppiont _context,IEntityRepository<Patient> _patientContext)
        {
            context = _context;
            patientContext = _patientContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Appointment>>> GetPatient_Appoinments(int id)
        {  /////****///
           List< Patient_Appoinment> patientHasAppoinment = await context.GetPatientWithAppointmentById(id);

            if (patientHasAppoinment.Count == 0)
            {
                return BadRequest("ليس لديك مواعيد مع اي دكتور");
            }

            List<Appointment> appointments = new List<Appointment>();
            foreach (var item in patientHasAppoinment)
            {
               List <Appointment> patient_appoinment = await context.GetByAppointmentId(item.id);
                //if(patient_appoinment.Count == 0)
                //{
                //    return BadRequest("ليس لديك مواعيد مع اي دكتور");
                //}
                foreach (var item1 in patient_appoinment)
                {
                    appointments.Add(item1);
                } 
            } 
            return appointments;
        }

        [HttpPost]
        public async Task<ActionResult<Patient_Appoinment>> AddPatient_Appoinment(addApointTOPatient patient_Appoinment)
        {
            if(patient_Appoinment == null)
                     return BadRequest();

            Patient_Appoinment patientAppointToAdd = new Patient_Appoinment()
            {
                patient_id = patient_Appoinment.patient_id,

            };
            await context.Add(patientAppointToAdd,patient_Appoinment.patient_id);
            return Ok(patientAppointToAdd);
            }

        // // DELETE 
        [HttpDelete("{appoint_id:int}")]
        public async Task<IActionResult> DeletePatient_Appoinment(int appoint_id)
        { 
          bool isDeleted=  await context.DeleteSoft(appoint_id);
            if(isDeleted)
                    return Ok("تم الحذف بنجاح");
            return BadRequest("لم نتمكن من الحذف , حاول في وقت لاحق ");
        }

        [HttpPut("{appoint_id}/{patient_id}")]
        public async Task<IActionResult> UpdatePatientAppointState(int appoint_id, int patient_id)
        {
            bool isUpdated = await context.UpdateState(appoint_id, patient_id);
            if (isUpdated)
                return Ok();
            return BadRequest();
        }
    }
    }
