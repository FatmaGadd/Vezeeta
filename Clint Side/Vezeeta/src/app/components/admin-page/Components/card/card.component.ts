import { Component, Input } from '@angular/core';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { SearchService } from 'src/app/Services/Entity_Services/search.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  layout: string = 'list';


  @Input() items: any;
  loading: boolean = false;

  constructor(private doctor: SearchService) {

  }

  ngOnInit() {
    // this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
  }

  getDate(date: any) {
    return (new Date(date).toLocaleDateString())
  }
  accept(user: any) {
    this.loading = true;
    let userid = user["id"]

    this.doctor.updatestate(userid, true).subscribe(res => {
      // alert("success") 
      this.items = this.items.filter((a: any) => a["id"] != userid)
      this.loading = false
    })



  }
  reject(user: any) {
    let userid = user["id"]
    this.doctor.deleteUSer(userid, true).subscribe(res => {
      alert("success")
      this.items = this.items.filter((a: any) => a["id"] != userid)
      console.log(this.items)
    })



  }
}
