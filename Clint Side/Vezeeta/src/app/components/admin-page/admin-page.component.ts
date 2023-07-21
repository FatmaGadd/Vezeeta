import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { SearchService } from 'src/app/Services/Entity_Services/search.service';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';
import { ReigonService } from './../../Services/Entity_Services/reigon.service';
import { CityService } from './../../Services/Entity_Services/city.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  doctorlist: any;
  unactiveUsers: any;
  specalizationlist: any;
  Reigonlist: any;
  CityList: any;
  constructor(private DrrService: DoctorService, private search: SearchService, private special: SpecializationService, private reigon: ReigonService, private city: CityService) {

  }


  ngOnInit(): void {
    this.DrrService.getAll().subscribe(res => {
      this.doctorlist = res.body;
    })
    this.special.GetAll().subscribe(res => {
      this.specalizationlist = res.body;
      // console.log(this.specalizationlist)
    })
    this.search.getUNactive().subscribe(res => {
      this.unactiveUsers = res.body;
    })
    this.search.getUSers().subscribe(res => {
      this.currentItem = res;
    })
    this.reigon.GetAll().subscribe(res => {
      this.Reigonlist = res.body;
    })
    this.city.GetAll().subscribe(res => {
      this.CityList = res.body;
    })
  }

  currentItem: any;
}
