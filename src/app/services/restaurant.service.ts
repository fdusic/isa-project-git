import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {RestaurantHelp} from "../beans/helps/restaurant-help";
import {MenuItem} from "../beans/menu-item";
import {Restaurant} from "../beans/app.restaurant";
import {RestaurantSegment} from "../beans/restaurant-segment";
import {Employee} from "../beans/employee";
import {Schedule} from "../beans/schedule";
import {UserGrade} from "../beans/user-grade";
import {Supplier} from "../beans/supplier";
import {Purchase} from "../beans/purchase";

@Injectable()
export class RestaurantService {

  private path:string = 'http://localhost:8080/restaurant/';

  private json = {
    "employee": {
      "id": 1,
      "username": "Perica",
      "password": "admin",
      "name": "Pera",
      "surname": "Peric",
      "address": "Psukinova 21",
      "confectionNum": 123312,
      "shoeSize": 40,
      "waiterGrade": 0,
      "role": "WAITER",
      "restaurant": {"id": 1, "name": "Veliki", "address": "Puskinova 12", "description": "Bas je fionooo", "grade": 0}
    },
    "shift": "FIRST",
    "restaurant": {"id": 1, "name": "Veliki", "address": "Puskinova 12", "description": "2017-02-25", "grade": 0},
    "date": "2017-02-25T14:15:31.140Z"
  };

  constructor(private http:Http) { }


  addRestaurant(rh:RestaurantHelp){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addRestaurant/', JSON.stringify(rh), { headers : h, withCredentials : true });
  }

  checkRestaurantName(name:string){
    return this.http.post(this.path + 'checkRestaurantName/', name.trim(), { withCredentials : true});
  }

  getRestaurantByName(name:string){
    return this.http.post(this.path + 'getRestaurantByName/', name.trim(), { withCredentials : true});
  }

  getRestaurantById(id:string){
    return this.http.post(this.path + 'getRestaurantById/', id, { withCredentials : true});
  }

  getAllRestaurants(){
    return this.http.get(this.path + 'getAllRestaurants', { withCredentials : true} );
  }


  addMenuItem(mi:MenuItem){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addMenuItem/', JSON.stringify(mi), { headers : h, withCredentials : true });
  }

  getMenuItems(restaurant:Restaurant){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'getMenuItems/', JSON.stringify(restaurant), { headers : h, withCredentials : true });
  }

  changeMenuItem(mi:MenuItem){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'changeMenuItem/', JSON.stringify(mi), { headers : h, withCredentials : true });
  }

  deleteMenuItem(mi:MenuItem){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'deleteMenuItem/', JSON.stringify(mi), { headers : h, withCredentials : true });
  }

  onFinishConfiguration(rs:RestaurantSegment[]){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'onFinishConfiguration/', JSON.stringify(rs), { headers : h, withCredentials : true });
  }

  changeRestaurantSegment(rs:RestaurantSegment){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'changeRestaurantSegment/', JSON.stringify(rs), { headers : h, withCredentials : true });
  }

  getRestaurantSegments(r:Restaurant) {
    let h = new Headers();
    h.append('Content-type', 'application/json');
    return this.http.post(this.path + 'getRestaurantSegments/', JSON.stringify(r), {headers: h, withCredentials: true});
  }
  addEmployee(emp : Employee){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addEmployee/', JSON.stringify(emp), { headers : h, withCredentials : true });
  }

  checkEmployeeUsername(username : string){
    return this.http.post(this.path + 'checkEmployeeUsername', username, { withCredentials : true });
  }

  getSchedules(restaurant : Restaurant){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'getSchedules', JSON.stringify(restaurant), {withCredentials : true, headers : h});
  }

  getWorkers(restaurant : Restaurant){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'getWorkers', JSON.stringify(restaurant), {withCredentials : true, headers : h});
  }

  addSchedule(s : Schedule){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addSchedule', JSON.stringify(s), {withCredentials : true, headers : h});
  }

  removeSchedule(s : Schedule){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'removeSchedule', JSON.stringify(s), {withCredentials : true, headers : h});
  }

  getRestaurantManager(restaurant:Restaurant){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'getRestaurantManager', JSON.stringify(restaurant), {withCredentials : true, headers : h});
  }

  changeRestaurant(rh:RestaurantHelp){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'changeRestaurant/', JSON.stringify(rh), { headers : h, withCredentials : true });
  }

  rateRestaurant(userGrade:UserGrade) {
    let h = new Headers();
    h.append('Content-type', 'application/json');
    return this.http.post(this.path + 'rateRestaurant/', JSON.stringify(userGrade), {
      headers: h,
      withCredentials: true
    });
  }
  checkSupplierUsername(username : string){
    return this.http.post(this.path + 'checkSupplierUsername', username, { withCredentials : true });
  }

  addSupplier(supplier : Supplier){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addSupplier/', JSON.stringify(supplier), { headers : h, withCredentials : true });
  }

  addPurchase(purchase : Purchase){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addPurchase/', JSON.stringify(purchase), { headers : h, withCredentials : true });
  }

}
