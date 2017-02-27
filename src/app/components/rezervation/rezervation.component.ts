import { Component, OnInit } from '@angular/core';
import {ViewChild} from "@angular/core/src/metadata/di";
import {Restaurant} from "../../beans/app.restaurant";
import {RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-rezervation',
  templateUrl: './rezervation.component.html',
  styleUrls: ['./rezervation.component.css']
})
export class RezervationComponent implements OnInit {


  @ViewChild('restaurants_a') restaurants_a : any;
  @ViewChild('tables_a') tables_a : any;
  @ViewChild('friends_a') friends_a : any;
  @ViewChild('orders_a') orders_a : any;


  @ViewChild('restaurants_div') restaurants_div : any;
  @ViewChild('tables_div') tables_div : any;
  @ViewChild('friends_div') friends_div : any;
  @ViewChild('orders_div') orders_div : any;



  private restaurants:Restaurant[]=[];

  constructor(private restaurantService:RestaurantService) { }

  ngOnInit() {

    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = JSON.parse(data['_body']);
      }
    );
  }

}
