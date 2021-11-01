using PharmacyInfo.Core.Entities;
using PharmacyInfo.Core.Interfaces;
using System.Collections.Generic;

namespace PharmacyInfo.BusinessLogicLayer
{
    public class PharmacyService
    {
        private IRepository<Pharmacy> _repository;

        public PharmacyService(IRepository<Pharmacy> repository)
        {
            _repository = repository;
        }

        public void AddEntity(Pharmacy entity)
        {
            _repository.AddEntity(entity);
        }

        public List<Pharmacy> GetEntities()
        {
            return _repository.FindAll();
        }
    }
}
