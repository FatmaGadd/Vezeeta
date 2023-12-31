﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vezeeta.Models;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.DTO.Adding_DTO;
using Microsoft.AspNetCore.Authorization;
using Vezeeta.DTO.patientDTO;

namespace Vezeeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        IAppointment _context;

        public AppointmentsController(IAppointment context)
        {
            _context = context;
        }

        // GET: api/Appointments
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            IEnumerable<Appointment> appointments = await _context.Get();
            if (appointments == null) return NotFound();

            return Ok(appointments);
        }


        [HttpGet("{Dr_id}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments(int Dr_id)
        {
            IEnumerable<Appointment> appointments = await _context.GetAll(Dr_id);
            if (appointments == null) return NotFound();

            return Ok(appointments);
        }

        // GET: api/Appointments/5
        [HttpGet("{id},{Dr_id}")]
        public async Task<ActionResult<AddpatienAppointToAppointTableDTO>> GetAppointment(int id, int Dr_id)
        {
            var appointment = await _context.GetById(id, Dr_id);
            if (appointment == null) return NotFound();

            return Ok(appointment);
        }

        // PUT: api/Appointments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id},{Dr_id}")]
        public async Task<IActionResult> PutAppointment(int id, int Dr_id, UpdateAppoinmentDTO appointment)
        {
            Appointment? a = await _context.GetById(id, Dr_id);
            if (a == null) return NotFound();
            if (id != a.id || Dr_id != a.Dr_id) return BadRequest();
            Patient_Appoinment patientappointment = null;
            if (appointment?.patientAppointDTO?.patient_id != null)
            {
                patientappointment = new Patient_Appoinment()
                {
                    patient_id = appointment.patientAppointDTO.patient_id
                };
            }

            try
            {
                a.start_date = appointment.start_date;
                a.end_date = appointment.end_date;
                a.type = appointment.type;
                a.patients_per_day = appointment.patients_per_day;
                a.appoint = patientappointment;
                await _context.Update(id, Dr_id, a);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (GetAppointment(id, Dr_id) == null)
                {
                    return NotFound();
                }
            }
            var response = new
            {
                message = "Update Success",
                a
            };
            return Accepted(response);
            //return AcceptedAtAction("GetAppointment", new { id = a.id, Dr_id = a.Dr_id }, a);
        }

        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Appointment>> PostAppointment(AddAppointmentDTO appointment)
        {
            if (appointment == null) return BadRequest();
            try
            {
                Appointment a = new Appointment()
                {
                    Dr_id = appointment.Dr_id,
                    start_date = appointment.start_date,
                    end_date = appointment.end_date,
                    type = appointment.type,
                    patients_per_day = appointment.patients_per_day
                };
                await _context.Add(a);
                return CreatedAtAction("GetAppointment", new { id = a.id, Dr_id = a.Dr_id }, a);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id},{Dr_id}")]
        public async Task<IActionResult> DeleteAppointment(int id, int Dr_id)
        {
            Appointment? a = await _context.GetById(id, Dr_id);

            if (a == null) return NotFound();
            try
            {
                await _context.DeleteById(id, Dr_id);
                var response = new
                {
                    message = "Deleted Success",
                    a
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // soft delete
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> softDeleteAppointForPatient(int id)
        {
            bool isDeleted = await _context.SoftDelete(id);
            if (isDeleted)
                return Ok("تم الحذف بنجاح");
            return BadRequest("لم نتمكن من الحذف , حاول في وقت لاحق ");
        }
    }
}
