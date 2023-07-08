using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Vezeeta.dbContext;
using Vezeeta.IEntities;
using Vezeeta.Models;
using Vezeeta.Repository;
using Vezeeta.Repository.clinics;
using Vezeeta.Repository.Docotr_Clinic;
using Vezeeta.Repository.doctor;
using Vezeeta.Repository.doctor_phones;

namespace Vezeeta
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            #endregion

            #region Json Serializer //cause we don't need to make DTOs for getting 
            builder.Services.AddMvc()
                .AddJsonOptions(option =>
                {
                    option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });
            #endregion

            #region db Connection
            // Add services to the container.

            builder.Services.AddDbContext<VezeetaContext>(db =>
            db.UseSqlServer(
                builder.Configuration.GetConnectionString("conn")
                )
            );
            #endregion

            #region JWT
            #endregion

            #region DI
            builder.Services.AddScoped<IEntityRepository<Doctor>, DoctorRepository>();
            builder.Services.AddScoped<IDoctor_phones, Doctor_phonesRepository>();
            builder.Services.AddScoped<IEntityRepository<Clinic>, ClinicRepository>();
            builder.Services.AddScoped<IDoctor_Clinic, Doctor_clinicRepository>();
            #endregion

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.UseCors("AllowAll");

            app.Run();
        }
    }
}