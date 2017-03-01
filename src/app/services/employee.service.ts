import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Employee} from "../beans/employee";
import {Order} from "../beans/order";
import {Bill} from "../beans/bill";

@Injectable()
export class EmployeeService {

  private path = 'http://localhost:8080/employee/';
  public orderForChange: Order;

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

  getBartenders(){
    return this.http.get(this.path + 'getBartenders', { withCredentials: true});
  }

  getChefs(){
    return this.http.get(this.path + 'getChefs', { withCredentials: true});
  }

  getMenuItems(){
    return this.http.get(this.path + 'getMenuItems', { withCredentials: true });
  }

  addOrder(order: Order){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addOrder', JSON.stringify(order), {headers: h, withCredentials: true});
  }
  changeOrder(order: Order){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'changeOrder', JSON.stringify(order), {headers: h, withCredentials: true});
  }

  chefAcceptOrder(order: Order){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'chefAcceptOrder', JSON.stringify(order), {headers: h, withCredentials: true});
  }

  chefFinishOrder(order: Order){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'chefFinishOrder', JSON.stringify(order), {headers: h, withCredentials: true});
  }

  bartenderFinishOrder(order: Order){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'bartenderFinishOrder', JSON.stringify(order), {headers: h, withCredentials: true});
  }

  waiterFinishOrder(order: Order){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'waiterFinishOrder', JSON.stringify(order), {headers: h, withCredentials: true});
  }

  getWaiterOrders(){
    return this.http.get(this.path + 'getWaiterOrders', { withCredentials: true});
  }

  getChefOrders(){
    return this.http.get(this.path + 'getChefOrders', { withCredentials: true});
  }

  getBartenderOrders(){
    return this.http.get(this.path + 'getBartenderOrders', { withCredentials: true});
  }

  getEmployeeSchedules(){
    return this.http.get(this.path + 'getEmployeeSchedules', {withCredentials: true});
  }

  setPassword(password: string){
    return this.http.post(this.path + 'setPassword', password, {withCredentials: true});
  }

  getScheduleForEmp(emp: Employee) {
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'getScheduleForEmp', JSON.stringify(emp), {headers: h, withCredentials: true});
  }

  createBill(bill: Bill){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'createBill', JSON.stringify(bill), {headers: h, withCredentials: true});
  }

}
