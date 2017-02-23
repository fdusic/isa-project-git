import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Employee} from "../beans/employee";

@Injectable()
export class EmployeeService {

  private path = 'http://localhost:8080/employee/';

  constructor(private http: Http) { }


  getEmployee(){
    return this.http.get(this.path + 'getEmployee', {withCredentials : true});
  }

  modifyUser(employee : Employee){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'modifyEmployee', JSON.stringify(employee), { headers : h, withCredentials : true });
  }

  checkPassword(password: string){
    return this.http.post(this.path + 'checkPassword', password, {withCredentials: true});
  }

}
