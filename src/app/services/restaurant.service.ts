import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {RestaurantHelp} from "../beans/helps/restaurant-help";

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
    return this.http.post(this.path + 'checkRestaurantName/', name.trim());
  }

  getRestaurantByName(name:string){
    return this.http.post(this.path + 'getRestaurantByName/', name.trim());
  }

}
