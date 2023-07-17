using Vezeeta.Models;

namespace Vezeeta.DTO.SearchDTO
{
    public class SearchReturnDTO
    {
        public int DrID { get; set; }
        public string DrName { get; set; }
        public Address Clinic_address { get; set; }
        public decimal?   Clinic_feese { get; set; }
        public Clinic   Clinic { get; set; }
        public string image { get; set; }
        public int Reigon { get; set; }
        public int Cityid { get; set; }
        public int specilalization { get; set; }
        public string WattingTime { get; set; }
        public List<Appointment> Appointments { get; set; }

    }
}
