import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpecializationService } from 'src/app/Services/Entity_Services/specialization.service';
import { ISpecialization } from 'src/app/Interfaces/ispecialization';

@Component({
  selector: 'app-addspecial',
  templateUrl: './addspecial.component.html',
  styleUrls: ['./addspecial.component.css']
})
export class AddspecialComponent {
  error = false;
  @Input() specil: any;

  constructor(private special: SpecializationService) {

  }
  Form = new FormGroup({
    // [a-zA-Z\u0600-\u06FF,-\s\d][\s\d\a-zA-Z\u0600-\u06FF,-]
    special: new FormControl('', [Validators.pattern("^[a-zA-Z\u0600-\u06FF]{3,30}$")])
  })
  onSubmit() {
    this.error = false;
    console.log(this.Form.valid)
    console.log(this.Form?.controls["special"]?.value?.trim().length)
    // if (this.Form.controls["special"].value.trim()&&this.Form.invalid) {

    //   let test = this.specil.some((a: any) => { return a.name === this.Form.controls["special"].value })
    //   if (test)
    //     this.error = true
    //   else {
    //     let x: ISpecialization = { name: this.Form.controls["special"].value, id: 0 }
    //     this.special.Add(x).subscribe(res => {
    //       alert("Success");
    //       this.Form.controls["special"].setValue("")
    //       this.specil.push(x);
    //     })
    //   }
    // }
  }
}
