import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {RestaurantHelp} from "../beans/helps/restaurant-help";
import {MenuItem} from "../beans/menu-item";
import {Restaurant} from "../beans/app.restaurant";
import {RestaurantSegment} from "../beans/restaurant-segment";

@Injectable()
export class RestaurantService {

  private path:string = 'http://localhost:8080/restaurant/';

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

  onFinishConfiguration(rs:RestaurantSegment[]){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'onFinishConfiguration/', JSON.stringify(rs), { headers : h, withCredentials : true });
  }

  getRestaurantSegments(r:Restaurant){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'getRestaurantSegments/', JSON.stringify(r), { headers : h, withCredentials : true });
  }

}
