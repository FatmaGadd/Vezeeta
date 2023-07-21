import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISpecialization } from 'src/app/Interfaces/ispecialization';
import { ReigonService } from './../../../../Services/Entity_Services/reigon.service';
import { Ireigon } from './../../../../Interfaces/ireigon';

@Component({
  selector: 'app-addreigon',
  templateUrl: './addreigon.component.html',
  styleUrls: ['./addreigon.component.css']
})
export class AddreigonComponent {
  error = false;
  @Input() specil: any;

  constructor(private special: ReigonService) {

  }
  Form = new FormGroup({
    // [a-zA-Z\u0600-\u06FF,-\s\d][\s\d\a-zA-Z\u0600-\u06FF,-]
    special: new FormControl('', [Validators.pattern("^[a-zA-Z\u0600-\u06FF]{3,30}$")])
  })
  onSubmit() {
    alert("f")
    this.error = false;
    console.log(this.Form.valid)


    if (this.Form.controls["special"]?.value?.trim().length == 0 || this.Form.invalid) {

      this.error = true

    } else {

      let test = this.specil.some((a: any) => { return a.name === this.Form.controls["special"].value })
      if (test)
        this.error = true
      else {
        let x: Ireigon = { name: this.Form.controls["special"].value, id: 0, Cities: [], status: "no status" }
        this.special.Add(x).subscribe(res => {
          alert("Success");
          this.Form.controls["special"].setValue("")
          this.specil.push(x);
        })
      }
    }
  }
}
