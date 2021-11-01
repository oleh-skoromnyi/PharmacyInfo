using System.Collections.Generic;

namespace PharmacyInfo.Core.Interfaces
{
    public interface IRepository<T>
    {
        void AddEntity(T entity);

        List<T> FindAll();
    }
}
