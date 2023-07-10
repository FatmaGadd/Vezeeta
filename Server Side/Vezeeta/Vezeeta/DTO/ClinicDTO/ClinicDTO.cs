using System.ComponentModel.DataAnnotations;
using Vezeeta.DTO;
using Vezeeta.Models;

namespace Vezeeta.DTO.ClinicDTO
{
    public class ClinicDTO
    {
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string name { get; set; }
        [Required]
        [StringLength(12)]
        public string phone { get; set; }

        public AddressDTO Address { get; set; }
    }
}
