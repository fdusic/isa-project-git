import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SupplierService} from "../../../services/supplier.service";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  private type : string;

  @ViewChild('newPassErr') newPassErr : any;
  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute, private supplierService : SupplierService) { }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.params['type'];
  }

  onSubmit(form: NgForm){
    console.log(form.controls['password1'].value);
    if(form.controls['password1'].value != "" || form.controls['password2'].value != ""){
      if(form.controls['password1'].value != form.controls['password2'].value){
        this.newPassErr.nativeElement.innerHTML = "Passwords are different!";
        return;
      } else{
        this.newPassErr.nativeElement.innerHTML = "";
      }
    }
    let password = form.controls['password1'].value;
    if(this.type == 'emp') {
      this.employeeService.setPassword(password).subscribe(
        (data) => {
          this.router.navigateByUrl('/home/employee-profile');
        }
      )
    } else if(this.type = 'supp'){
      this.supplierService.changePassword(password).subscribe(
        () => {
          this.router.navigateByUrl('/home/supplier');
        }
      );
    }
  }

}
