﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Vezeeta.Models
{
    public partial class Address
    {
        [Key]
        public int id { get; set; }
        [Required]
        [StringLength(50)]
        public string street { get; set; }
        [Required]
        [StringLength(50)]
        public string square { get; set; }
        [Required]
        [StringLength(50)]
        public string building { get; set; }
        public int floor_num { get; set; }
        public int flat_num { get; set; }
        [StringLength(150)]
        public string notes { get; set; }
        public int clinic_id { get; set; }

        [ForeignKey("clinic_id")]
        [InverseProperty("Addresses")]
        public virtual City clinic { get; set; }
        [ForeignKey("clinic_id")]
        [InverseProperty("Addresses")]
        public virtual Clinic clinicNavigation { get; set; }
    }
}