using PharmacyInfo.Core.Entities;
using PharmasyInfo.Core.Interfaces;
using System.Collections.Generic;

namespace PharmacyInfo.BusinessLogicLayer
{
    public class PatientService
    {
        private IRepository<Patient> _repository;

        public PatientService(IRepository<Patient> repository)
        {
            _repository = repository;
        }

        public void AddEntity(Patient entity)
        {
            _repository.AddEntity(entity);
        }

        public List<Patient> GetEntities()
        {
            return _repository.FindAll();
        }
    }
}
