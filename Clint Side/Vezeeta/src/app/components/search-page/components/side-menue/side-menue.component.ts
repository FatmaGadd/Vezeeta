import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-menue',
  templateUrl: './side-menue.component.html',
  styleUrls: ['./side-menue.component.css']
})
export class SideMenueComponent implements OnInit {
  queryparams: any
  // Form: FormGroup
  Form = new FormGroup({
    male: new FormControl(false)
    , female: new FormControl(false)
    , price: new FormControl(' ')
    , today: new FormControl(false)
    , towm: new FormControl(false)
    , anydate: new FormControl(false)
  })
  constructor(private activatedrot: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.activatedrot.queryParams.subscribe(params => {

      this.queryparams = {

        City: params["city"],
        Reigon: params["reigon"],
        Fese: 0,
        Gender: "",
        Name: params["name"],
        Specialization: params["special"]
      }
    }
    )


  }

  get fvalues() {
    return this.Form.value;
  }

  ale() {
    console.clear()

    let gender = " "
    let price;
    let day = 0;

    console.log("-----------------------------------------------")
    console.log("any" + this.Form.controls.anydate.value);
    console.log("tow" + this.Form.controls.towm.value);
    console.log("tod" + this.Form.controls.today.value);
    if ((this.fvalues["male"] && this.fvalues['female']) || (this.fvalues["male"] == false && this.fvalues['female'] == false)) {
      gender = "";
    } else if (this.fvalues["male"]) {
      gender = "m"
    } else {
      gender = "f"
    }

    price = this.fvalues["price"]

    if (this.fvalues["anydate"])
      day = 0;
    else if (this.fvalues["today"] && !this.fvalues["towm"]) { day = 1 }
    else if (!this.fvalues["today"] && this.fvalues["towm"]) { day = 2 }
    else {
      day = 0;
    }
    console.log(gender)
    console.log(price)
    console.log(day)
    this.router.navigate(
      ['/search'],
      {
        queryParams: {
          type: "b",
          city: this.queryparams["City"],
          reigon: this.queryparams["Reigon"],
          name: this.queryparams["Name"],
          special: this.queryparams["Specialization"],
          gender: gender,
          fese: price,
          date: day
        }
      }
    );
  }
  // pricevalue() {
  //   switch (this.fvalues["price"]) {
  //     case "0":
  //       return 0;
  //     case "4001":
  //       return "1"
  //     case "50":
  //       return 50;
  //     case "100":
  //       return 100
  //     case "200":
  //       return 200;
  //     case "300":
  //       return 300

  //     default:
  //       return 0
  //       break;
  //   }
  // }
  genderval() {

  }
}
