import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { Doctors_List_Genrate } from 'src/app/Environment/DoctorList';
import { SearchTemp } from 'src/app/Environment/SearchTemp';
import { SearchService } from 'src/app/Services/Entity_Services/search.service';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';
import { ISearch } from './../../../../Interfaces/i-search';
import { AppoinmentService } from './../../../../Services/Entity_Services/appoinment.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  doctorslist: any;
  holderlist: any;
  specalizationlist: any;
  load: boolean = true;
  flag: boolean = true;


  constructor(private activatedrot: ActivatedRoute, private search: SearchService, private specialization: SpecializationService, private appointment: AppoinmentService) {

  }

  ngOnInit(): void {

    this.specialization.GetAll().subscribe(res => {
      this.specalizationlist = res.body

    })
    //-------------------get data from query string
    this.activatedrot.queryParams.subscribe(params => {
      console.log(params["fese"])
      console.log(params["gender"] == undefined)
      let temp: ISearch = {
        City: params["city"],
        Reigon: params["reigon"],
        Fese: params["fese"] == undefined ? 0 : +(params["fese"]),
        Gender: params["gender"] == undefined ? " " : params["gender"],
        Date: params["date"] == undefined ? 0 : +(params["date"]),
        // Gender: " ",
        Name: params["name"],
        Specialization: params["special"]
      }



      this.search.Search(temp).subscribe(res => {

        this.doctorslist = res;
        console.log(this.doctorslist)

        this.flag = false
        this.load = false
      })


    })

  }

  getSpecialById(id: Number) {
    return this.specalizationlist?.filter((a: any) => a["id"] == id)[0].name
  }

  getappointement(id: number) {

    let array = this.doctorslist.filter((a: any) => a["drID"] == id)[0]["appointments"]
    return this.doctorslist.filter((a: any) => a["drID"] == id)[0]["appointments"]
  }


}
