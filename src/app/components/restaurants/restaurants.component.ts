import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";
import {Restaurant} from "../../beans/app.restaurant";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  private restaurants:Restaurant[]=[];

  private lat: number = 51.678418;
  private lng: number = 7.809007;


  constructor(private restaurantService:RestaurantService) { }

  ngOnInit() {

    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = JSON.parse(data['_body']);
      }
    );
  }

}
