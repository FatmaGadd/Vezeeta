import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ireigon } from 'src/app/Interfaces/ireigon';
import { CityService } from './../../../../Services/Entity_Services/city.service';
import { ICity } from './../../../../Interfaces/i-city';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent {
  error = false;
  @Input() specil: any;
  @Input() cityes: any;

  constructor(private special: CityService) {

  }
  Form = new FormGroup({
    special: new FormControl('', [Validators.pattern("^[a-zA-Z\u0600-\u06FF]{3,30}$")])
    , reigon: new FormControl("0", [Validators.required])
  })
  onSubmit() {
    alert("f")
    this.error = false;
    console.log(this.Form.valid)


    if (this.Form.controls["special"]?.value?.trim().length == 0 || this.Form.controls["reigon"].value == "0" || this.Form.invalid) {

      this.error = true

    } else {

      let test = this.specil.some((a: any) => { return a.name === this.Form.controls["special"].value })
      if (test)
        this.error = true
      else {
        let x: ICity = { name: this.Form.controls["special"].value, id: 0, region: (Number(this.Form.controls["reigon"].value)), status: "no status" }
        this.special.Add(x).subscribe(res => {
          alert("Success");
          this.Form.controls["special"].setValue("")
          this.Form.controls["reigon"].setValue("0")
          this.cityes.push(x);
        })
      }
    }
  }
}
