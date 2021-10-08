using System;

namespace PharmacyInfo.Core.Entities
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime PharmacyAssignDate { get; set; }
        public int PharmacyId { get; set; }
        public string PharmacyName { get; set; }
    }
}
