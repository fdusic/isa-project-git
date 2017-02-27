import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  @ViewChild('newPassErr') newPassErr : any;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
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
    this.employeeService.setPassword(password).subscribe(
      (data) => {
        this.router.navigateByUrl('/home/employee-profile');
      }
    )

  }

}
