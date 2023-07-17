import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  constructor(private router: Router) {

  }
  @Input() products: any;
  counter = 0;
  responsiveOptions: any;
  // items!: string[];
  // items: any;
  cities!: any;
  selectedCity!: any;

  ngOnInit(): void {
    this.cities;
    // console.log(this.products[0]["appoint_id"])
    // console.log(this.products)
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.products = this.getArrayOFDays(this.products)
    console.log(this.products)




  }

  getArrayOFDays(array: any) {
    let arrayouter = [];
    let date = ((new Date()).setHours(0, 0, 0, 0));

    for (let i = 0; i < 7; i++) {
      let inner = [];
      for (let j = 0; j < array.length; j++) {
        if ((new Date(array[j]["start_date"])).setHours(0, 0, 0, 0) === date) {
          inner.push(array[j]);
        }
      }
      if (i == 0)
        arrayouter.push([inner, 'اليوم']);
      else
        if (i == 1)
          arrayouter.push([inner, 'غدا']);
        else
          arrayouter.push([inner, (new Date(date).toLocaleDateString('ar-EG'))]);
      date = ((new Date(date)).setDate(new Date(date).getDate() + 1))
    }
    return arrayouter;
  }
  date() {
    return (new Date()).toLocaleDateString();
  }
  // getitem(product: any) {
  //   return product["start_date"]
  // }
  // getstring(holder: any) {
  //   this.counter++;
  //   return this.counter
  // }
  getdate(product: any) {
    // let x = (new Date(product["start_date"])).toLocaleTimeString('ar-EG');
    // return x.slice(0, x.lastIndexOf(":"));
    // return x;
    return (new Date(product["start_date"])).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  click(product: any) {
    this.router.navigate([`/reservation/create/${product['id']}/${product['dr_id']}`])

    console.log(product)
  }
}
