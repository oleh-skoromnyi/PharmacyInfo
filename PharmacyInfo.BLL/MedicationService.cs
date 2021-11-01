using PharmacyInfo.Core.Entities;
using PharmacyInfo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyInfo.BusinessLogicLayer
{
    public class MedicationService
    {
        private IRepository<Medication> _repository;

        public MedicationService(IRepository<Medication> repository)
        {
            _repository = repository;
        }

        public void AddEntity(Medication entity)
        {
            _repository.AddEntity(entity);
        }

        public List<Medication> GetEntities()
        {
            return _repository.FindAll();
        }
    }
}
