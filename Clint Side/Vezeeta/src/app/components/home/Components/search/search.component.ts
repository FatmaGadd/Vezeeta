import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../../../../Services/Entity_Services/specialization.service';
import { CityService } from '../../../../Services/Entity_Services/city.service';
import { ReigonService } from '../../../../Services/Entity_Services/reigon.service';
import { ICity } from '../../../../Interfaces/i-city';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // fildes

  specializationList: any = []
  cityList: any = []

  regionList: any = []
  list: any = [{ id: 0, name: 'الكل' }];

  // cityListholder: any;

  special: any = 0;
  citys: any = 0;
  reigons: any = 0;


  Form = new FormGroup({
    special: new FormControl(0)
    , city: new FormControl(0)
    , reigon: new FormControl(0)
    , name: new FormControl('', [Validators.pattern("^[a-zA-Z]{1,30}$")])
  })

  // constructor
  constructor(private specialization: SpecializationService, private city: CityService, private reigon: ReigonService, private activatedrot: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.specialization.GetAll().subscribe(response => {
      this.specializationList = response.body;
    })



    this.reigon.GetAll().subscribe(response => {
      this.regionList = response.body;

    })

    // this.city.GetAll().subscribe(res => {
    //   console.log(res.body)
    //   this.cityListholder = res.body
    // })

  }
  // selectReigon(id: any) {
  //   let selectedreigon = this.regionList.find((element: any) => element.id == id);
  //   console.log(id)
  //   this.cityList = this.cityListholder.filter((a: any) => a["region_id"] == selectedreigon.id);
  // }


  selectReigon2(id: any) {
    this.list = [{ id: 0, name: 'الكل' }];
    this.Form.controls["city"].setValue(0)
    this.list = id?.cities
  }


  get fvalues() {
    return this.Form.value;
  }
  onSubmit() {
    if (this.Form.invalid) alert("invalid")
    else {

      console.log(this.special)
      console.log(this.citys)
      console.log(this.fvalues["name"])
      console.log(this.reigons)
      if (this.special != 0) {
        this.special = this.special["id"]
      } else {
        this.special = 0;
      }
      if (this.citys != 0) {
        this.citys = this.citys["id"]
      } else {
        this.citys = 0;
      }
      if (this.reigons != 0) {
        this.reigons = this.reigons["id"]
      } else {
        this.reigons = 0;
      }
      this.router.navigate(
        ['/search'],
        { queryParams: { type: "b", city: this.citys, reigon: this.reigons, name: (this.fvalues["name"]), special: this.special } }
      );
    }
  }
  // onSubmit() {
  //   if (this.Form.invalid) alert("invalid")
  //   else {
  //     console.log(this.fvalues["special"])


  //     this.router.navigate(
  //       ['/search'],
  //       { queryParams: { type: "b", city: this.fvalues["city"], reigon: this.fvalues["reigon"], name: (this.fvalues["name"]), special: this.fvalues["special"] } }
  //     );
  //   }
  // }


  // -----------------------------------------------------

}
