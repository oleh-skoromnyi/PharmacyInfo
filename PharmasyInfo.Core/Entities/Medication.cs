using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyInfo.Core.Entities
{
    public class Medication
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PharmacyItemInfo> Pharmacies { get; set; }
    }
}
