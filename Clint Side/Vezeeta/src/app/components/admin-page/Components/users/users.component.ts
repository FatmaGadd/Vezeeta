import { Component, Input } from '@angular/core';
import { SearchService } from 'src/app/Services/Entity_Services/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  layout: string = 'list';
  loading: boolean = false;

  @Input() items: any;
  @Input() specil: any;


  constructor(private doctor: SearchService) {

  }
  getspecial(id: any) {
    return (this.specil?.filter((a: any) => a["id"] == id))[0]["name"];

  }
  ngOnInit() {
    console.log(this.specil)
  }

  getDate(date: any) {

    return (new Date(date).toLocaleDateString())

  }
  accept(user: any) {
    this.loading = true;
    let userid = user["id"]
    this.doctor.updatestate(userid, true).subscribe(res => {
      this.loading = false
      user["status"] = true;
    })
  }
  pan(user: any) {
    let userid = user["id"]
    this.doctor.deactiveUser(userid, true).subscribe(res => {
      user["status"] = false;
    })
  }
  visible: boolean = false;
  value: any;
  showDialog(id: number) {
    this.value = id
    this.visible = true;

  }
  delet(user: any) {
    let userid = user["id"]
    if (confirm("are yousure")) {
      this.doctor.deleteUSer(userid, true).subscribe(res => {
        user["is_deleted"] = true;
      })
    }
  }
}
