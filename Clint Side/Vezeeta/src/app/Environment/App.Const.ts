//////////////////////* This is used to get the URLs of the api and to make it more maintainable *//////////////////////////////////
//patient,auth,patient_appiontment,review,address,region,city

const Base_URl = "https://localhost:7018/api";
//////////////////////////////////////////////

export class AuthURLs{
    public static Admin_Login(){
        return `${Base_URl}/login/admin`;
    }
    //patient & doctor auth
}

export class SpecializationURLs{
    public static Get_Post(){
        return `${Base_URl}/Specializations`;
    }
    public static GetById_Put_Delete(spec_id:number){
        return `${Base_URl}/Specializations/${spec_id}`;
    }
}

export class QuestionURLs{
    public static Get_Post(){
        return `${Base_URl}/Questions`;
    }
    public static GetById_Put_Delete(Q_id:number){
        return `${Base_URl}/Questions/${Q_id}`;
    }
}

export class AnswerURLs{
    public static Get(Q_id:number){
        return `${Base_URl}/Answers/${Q_id}`;
    }
    public static Post(){
        return `${Base_URl}/Answers`;
    }
    public static GetById_Put_Delete(Q_id:number,Dr_id:number){
        return `${Base_URl}/Answers/${Q_id},${Dr_id}`;
    }
}

export class AppointmentURLs{
    public static Get(Dr_id:number){
        return `${Base_URl}/Appointments/${Dr_id}`;
    }
    public static Post(){
        return `${Base_URl}/Appointments`
    }
    public static GetById_Put_Delete(id:number,Dr_id:number){
        return `${Base_URl}/Appointments/${id},${Dr_id}`;
    }
}


export class ClinicURLs{
    public static Get_Post(){
        return `${Base_URl}/Clinics`;
    }
    public static GetById_Put_Delete(id:number){
        return `${Base_URl}/Clinics/${id}`;
    }
}

export class DoctorURLs{
    public static Get_Post(){
        return `${Base_URl}/Doctors`;
    }
    public static GetById_Put_Delete(id:number){
        return `${Base_URl}/Doctors/${id}`;
    }
}

export class DoctorPhoneURLs{
    public static Get_Post(){
        return `${Base_URl}/Doctors_Phone`;
    }
    public static GetById(id:number){
        return `${Base_URl}/Doctors_Phone/${id}`;
    }
    public static Delete(id:number,phone:number){
        return `${Base_URl}/Doctors_Phone/${id}/${phone}`;
    }
}

export class PrescriptionURLs{
    public static GetByDoctor(Dr_id:number){
        return `${Base_URl}/Prescriptions/Doctor/${Dr_id}`;
    }
    public static GetByPatient(Patient_id:number){
        return `${Base_URl}/Prescriptions/Doctor/${Patient_id}`;
    }
    public static Post(){
        return `${Base_URl}/Prescriptions`;
    }
    public static GetById_Put_Delete(Dr_id:number,patient_id:number){
        return `${Base_URl}/Prescriptions/${Dr_id},${patient_id}`;
    }
}

