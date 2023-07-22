using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vezeeta.DTO.ReviewDTO
{
    public class ReviewDTO
    {
        public int Dr_id { get; set; }
        public int patient_id { get; set; }
        public string value { get; set; }
        public string comment { get; set; }
    }
}
