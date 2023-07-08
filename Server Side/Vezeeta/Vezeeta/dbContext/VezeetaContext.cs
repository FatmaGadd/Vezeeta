﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Vezeeta.Models;

namespace Vezeeta.dbContext
{
    public partial class VezeetaContext : DbContext
    {
        public VezeetaContext()
        {
        }

        public VezeetaContext(DbContextOptions<VezeetaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Clinic> Clinics { get; set; }
        public virtual DbSet<Clinic_Doctor> Clinic_Doctors { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<Doctors_Phone> Doctors_Phones { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<Patient_Appoinment> Patient_Appoinments { get; set; }
        public virtual DbSet<Prescription> Prescriptions { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<Specialization> Specializations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasOne(d => d.city)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.city_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Addresses_Cities1");

                entity.HasOne(d => d.clinic)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.clinic_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Addresses_Clinics");
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => new { e.Dr_id, e.Q_id });

                entity.Property(e => e.create_at).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Dr)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.Dr_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Answers_Doctors");

                entity.HasOne(d => d.Q_idNavigation)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.Q_id)
                    .HasConstraintName("FK_Answers_Questions");
            });

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => new { e.Dr_id, e.id });

                entity.Property(e => e.id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Dr)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.Dr_id)
                    .HasConstraintName("FK_Appointments_Doctors");

                entity.HasOne(d => d.appoint)
                    .WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.appoint_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Appointments_Patient_Appoinment");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.HasOne(d => d.region)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.region_id)
                    .HasConstraintName("FK_Cities_Regions");
            });

            modelBuilder.Entity<Clinic_Doctor>(entity =>
            {
                entity.HasKey(e => new { e.Dr_id, e.clinic_id });

                entity.HasOne(d => d.Dr)
                    .WithMany(p => p.Clinic_Doctors)
                    .HasForeignKey(d => d.Dr_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Clinic_Doctor_Doctors");

                entity.HasOne(d => d.clinic)
                    .WithMany(p => p.Clinic_Doctors)
                    .HasForeignKey(d => d.clinic_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Clinic_Doctor_Clinics");
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.Property(e => e.create_at).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.gender).IsFixedLength();

                entity.Property(e => e.status).HasDefaultValueSql("((0))");

                entity.Property(e => e.update_at).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.id_specializeNavigation)
                    .WithMany(p => p.Doctors)
                    .HasForeignKey(d => d.id_specialize)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Doctors_Specializations");
            });

            modelBuilder.Entity<Doctors_Phone>(entity =>
            {
                entity.HasKey(e => new { e.phone, e.Dr_id });

                entity.HasOne(d => d.Dr)
                    .WithMany(p => p.Doctors_Phones)
                    .HasForeignKey(d => d.Dr_id)
                    .HasConstraintName("FK_Doctors_Phones_Doctors");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(e => e.create_at).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.state).HasDefaultValueSql("((0))");

                entity.Property(e => e.update_at).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Patient_Appoinment>(entity =>
            {
                entity.Property(e => e.create_at).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.patient)
                    .WithMany(p => p.Patient_Appoinments)
                    .HasForeignKey(d => d.patient_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Patient_Appoinment_Patients");
            });

            modelBuilder.Entity<Prescription>(entity =>
            {
                entity.HasKey(e => new { e.Dr_id, e.patient_id });

                entity.HasOne(d => d.Dr)
                    .WithMany(p => p.Prescriptions)
                    .HasForeignKey(d => d.Dr_id)
                    .HasConstraintName("FK_Prescriptions_Doctors");

                entity.HasOne(d => d.patient)
                    .WithMany(p => p.Prescriptions)
                    .HasForeignKey(d => d.patient_id)
                    .HasConstraintName("FK_Prescriptions_Patients");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.create_at).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.patient)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.patient_id)
                    .HasConstraintName("FK_Questions_Patients");

                entity.HasOne(d => d.spec)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.spec_id)
                    .HasConstraintName("FK_Questions_Specializations");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => new { e.Dr_id, e.patient_id });

                entity.Property(e => e.created_at).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.updated_at).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Dr)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.Dr_id)
                    .HasConstraintName("FK_Reviews_Doctors");

                entity.HasOne(d => d.patient)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.patient_id)
                    .HasConstraintName("FK_Reviews_Patients");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}