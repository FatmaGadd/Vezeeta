﻿using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.DTO.DoctorDTO;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository.doctor
{
    public class DoctorRepository : IEntityRepository<Doctor>
    {

        #region fields
        private readonly VezeetaContext db;
        #endregion
        #region constructor
        public DoctorRepository(VezeetaContext _db)
        {
            db = _db;
        }
        #endregion


        public async Task<Doctor> Add(Doctor doctor)
        {
            Doctor oldDr = await db.Doctors.FirstOrDefaultAsync(d => d.email == doctor.email);
            if (oldDr == null)
            {
                await db.AddAsync(doctor);
                await db.SaveChangesAsync();
                return doctor;
            }
            return null;
        }

        public async Task DeleteById(int id)
        {
            Doctor dr = await db.Doctors.FirstOrDefaultAsync(d => d.id == id);
            if (dr != null)
            {
                dr.is_deleted = true;
                await Update(id, dr);
            }
        }

        public async Task<List<Doctor>> GetAll()
        {
            return await db.Doctors.ToListAsync();
        }

        public async Task<Doctor> GetById(int id)
        {

            return await db.Doctors.FirstOrDefaultAsync(d => d.id == id);
        }

        public async Task<Doctor> Update(int id, Doctor doctor)
        {
            
                db.Entry(doctor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await db.SaveChangesAsync();
                return doctor;
         
        }


    }
}