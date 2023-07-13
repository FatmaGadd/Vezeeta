export interface IAddress {
    clinic_Doctors:
        {
          clinic: {
            address: {
                clinic_id:number,
                Dr_id:number,
              street: string,
              square: string,
              building: string,
              floor_num: number,
              flat_num: number,
              notes: string,
              city: {
                name:string,
                region: {
                  name: string,
                }
            }
        }
    }
}
        
}

