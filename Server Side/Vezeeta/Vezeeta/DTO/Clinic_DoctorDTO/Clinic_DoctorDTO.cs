using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vezeeta.DTO.Clinic_DoctorDTO
{
    public class Clinic_DoctorDTO
    {
        public int Dr_id { get; set; }
        [Column(TypeName = "decimal(8,2)")]
        [Required]
        public decimal? fees { get; set; }

        public int clinic_id { get; set; }
    }
}
