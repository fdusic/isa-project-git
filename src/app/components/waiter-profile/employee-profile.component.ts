import { Component, OnInit } from '@angular/core';
import {Employee} from "../../beans/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-waiter-profile',
  templateUrl: 'employee-profile.component.html',
  styleUrls: ['employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  private employee: Employee;

  constructor(private employeeService: EmployeeService) {
    this.employeeService.getEmployee().subscribe(
      (data) => {
        console.log(data["_body"]);
        this.employee= JSON.parse(data["_body"]);
    });
  }

  getWaiterGrade(){
    if(this.employee != null) {
      if (this.employee.waiterGrade == 0) {
        return "Not rated";
      } else {
        return this.employee.waiterGrade.toString();
      }
    }
  }

  ngOnInit() {
  }

}
