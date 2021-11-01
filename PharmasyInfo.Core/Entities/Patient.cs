﻿using System;
using System.Collections.Generic;

namespace PharmacyInfo.Core.Entities
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime PharmacyAssignDate { get; set; }
        public List<PharmacyItemInfo> Pharmacies { get; set; }
    }
}
