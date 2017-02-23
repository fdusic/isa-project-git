import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../beans/employee";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
declare let swal : any;

@Component({
  selector: 'app-modify-waiter',
  templateUrl: 'modify-employee.component.html',
  styleUrls: ['modify-employee.component.css']
})
export class ModifyEmployeeComponent implements OnInit {

  private employee: Employee;
  private passwordCorrect = false;
  @ViewChild('invalidPassword') invalidPassword: any;
  @ViewChild('newPassErr') newPassErr : any;

  constructor(private employeService: EmployeeService, private router: Router) {
    this.employeService.getEmployee().subscribe(
      (data) => {
        this.employee = JSON.parse(data["_body"]);
      });
  }

  checkPassword(password: string){
    if(password.trim() != ""){
      this.employeService.checkPassword(password).subscribe(
        (data) => {
          if (data['_body'] == 'true') {
            this.invalidPassword.nativeElement.innerHTML = '';
            this.passwordCorrect = true;
          } else {
            this.invalidPassword.nativeElement.innerHTML = 'Invalid password';
            this.passwordCorrect = false;
          }
        }
      );
    }else {
      this.invalidPassword.nativeElement.innerHTML = 'Invalid password';
      this.passwordCorrect = false;
    }

  }

  onSubmit(form: NgForm) {
    let employee = new Employee();
    employee.username = this.employee.username;
    employee.password = this.employee.password;


    if(form.controls['newPassword1'].value != "" || form.controls['newPassword2'].value != ""){
      console.log("znjznjznj111")
      if(form.controls['newPassword1'].value != form.controls['newPassword2'].value){
        this.newPassErr.nativeElement.innerHTML = "Passwords are different!";
        console.log("rrrr")
        return;

      } else{
        employee.password = form.controls['newPassword1'].value;
        this.newPassErr.nativeElement.innerHTML = "";
      }
    }
    employee.name = form.controls['name'].value;
    employee.surname = form.controls['surname'].value;
    employee.confectionNum = form.controls['confectionNum'].value;
    employee.shoeSize = form.controls['shoeSize'].value;
    employee.address = form.controls['address'].value;
    let router = this.router;
    this.employeService.modifyUser(employee).subscribe(
      () => {
        swal({title : "Success!", text : "Your data has been modified!", type : "success"}, function(){
          router.navigateByUrl('/home/modify-employee');
        });
      }
    );
  }
  ngOnInit() {
  }

}
