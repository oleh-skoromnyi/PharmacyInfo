using System.Collections.Generic;

namespace PharmasyInfo.Core.Interfaces
{
    public interface IRepository<T>
    {
        void AddEntity(T entity);

        List<T> FindAll();
    }
}
