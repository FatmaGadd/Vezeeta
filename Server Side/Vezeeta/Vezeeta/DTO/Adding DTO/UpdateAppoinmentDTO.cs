using Vezeeta.DTO.patientDTO;

namespace Vezeeta.DTO.Adding_DTO
{
    public class UpdateAppoinmentDTO
    {
        public int id { get; set; }
        public int Dr_id { get; set; }
        public DateTime? start_date { get; set; }
        public DateTime? end_date { get; set; }
        public int? patients_per_day { get; set; }
        public bool type { get; set; }
        public addApointTOPatient? patientAppointDTO { get; set;}
    }
}
