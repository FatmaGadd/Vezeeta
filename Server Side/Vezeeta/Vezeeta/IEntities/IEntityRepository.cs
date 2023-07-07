namespace Vezeeta.IEntities
{
    public interface IEntityRepository<t>
    {
        public Task<List<t>> GetAll();
        public Task<t> GetById(int id);
        public Task Update(int id, t entity);
        public Task DeleteById(int id);
        public Task Add(t entity);
    }
}
