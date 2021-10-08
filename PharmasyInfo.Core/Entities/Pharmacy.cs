namespace PharmacyInfo.Core.Entities
{
    public class Pharmacy
    {
        public int Id { get; set; }
        public string PharmacyName { get; set; }
        public string StreetAddress { get; set; }
        public int StateCode { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber { get; set; }
    }
}
