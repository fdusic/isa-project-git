import {Component, OnInit, ViewChild} from '@angular/core';
import {Admin} from "../../beans/admin";
import {AdminService} from "../../services/admin.service";
import {Manager} from "../../beans/manager";
declare let swal: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private admin : Admin = new Admin();
  private errMessage : boolean = false;
  private errMessageAdmin : boolean = false;
  @ViewChild('repeatPassAdmin') repeatPassAdmin : any;
  @ViewChild('repeatPass') repeatPass : any;

  constructor(private httpService : AdminService) { }

  ngOnInit() {
    this.httpService.getAdmin().subscribe(
      data => {
        this.admin = JSON.parse(data['_body']);
      }
    );
  }
  onSubmitAddManager(man: Manager, repeatPassword: string) {
    if (man.password != repeatPassword) {
      this.errMessage = true;
      this.repeatPass.nativeElement.value = '';
      return;
    } else {
      this.errMessage = false;
    }

    this.httpService.addManager(man).subscribe(
      () => {
        swal("Good job!", "You added a new restaurant manager!", "success");
        var dirtyFormID = 'modifyEmpForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
      }
    );
  }
  onSubmitAddAdmin(a: Admin, repeatPassword: string) {
    if (a.password != repeatPassword) {
      this.errMessageAdmin = true;
      this.repeatPassAdmin.nativeElement.value = '';
      return;
    } else {
      this.errMessageAdmin = false;
    }
    this.httpService.addAdmin(a).subscribe(
      () => {
        swal("Good job!", "You added a new admin!", "success");
        var dirtyFormID = 'addAdminForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
      }
    );
  }

}
