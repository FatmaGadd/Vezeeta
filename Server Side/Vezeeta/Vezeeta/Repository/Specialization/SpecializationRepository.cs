using Microsoft.EntityFrameworkCore;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;

namespace Vezeeta.Repository //change namespace to repository direct
{
    public class SpecializationRepository : IEntityRepository<Specialization>

    {
        //fields
        VezeetaContext dbContext;

        //constructor
        public SpecializationRepository(VezeetaContext _dbContext)
        {
            dbContext = _dbContext;
        }

        //methods

        //add
        public async Task Add(Specialization spec)
        {
            await dbContext.AddAsync(spec);
            await dbContext.SaveChangesAsync();
        }

        //delete
        public async Task DeleteById(int id)
        {
            var spec = await GetById(id);
            if (spec != null)
            {
                dbContext.Remove(spec);
                await dbContext.SaveChangesAsync();
            }
        }

        //getall
        public async Task<List<Specialization>> GetAll()
        {
            return await dbContext.Specializations.ToListAsync();
        }

        //getbyid
        public async Task<Specialization> GetById(int id)
        {
            return await dbContext.Specializations.FirstOrDefaultAsync(spec => spec.id == id);
        }

        //update
        public async Task Update(int id, Specialization spec)
        {
            dbContext.Entry(spec).State= EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }
    }
}
