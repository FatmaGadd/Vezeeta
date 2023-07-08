using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Vezeeta.DTO.DoctorDTO
{
    public class DoctorDTO
    {
        [Column(TypeName = "decimal(8, 2)")]
        public decimal? online_fees { get; set; }
       
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string email { get; set; }
        [Required]
        [StringLength(150)]
        public string password { get; set; }
        [StringLength(250)]
        public string image { get; set; }
        [Required]
        [StringLength(1)]
        public string gender { get; set; }
        public int experience { get; set; }
        [Column(TypeName = "date")]
        public DateTime birth_date { get; set; }
        [Required]
        [StringLength(150)]
        public string verification { get; set; }
        
        public int id_specialize { get; set; }
        
        public string description { get; set; }
        
        [StringLength(50)]
        public string waiting_time { get; set; }
       
        [Required]
        [StringLength(50)]
        public string name { get; set; }

        
    }
}
