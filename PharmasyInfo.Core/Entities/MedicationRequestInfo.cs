using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyInfo.Core.Entities
{
    public class MedicationRequestInfo
    {
        public int PatientId { get; set; }
        public int MedicationId { get; set; }
        public string MedicationName { get; set; }
        public int MedicationCount { get; set; }
        public bool IsAccept { get; set; }
    }
}
