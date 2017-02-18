import { Component, OnInit } from '@angular/core';
import {Restaurant} from "../../beans/app.restaurant";
import {ActivatedRoute} from "@angular/router";
import {RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {


  private restaurant:Restaurant = new Restaurant();
  constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService) { }

  ngOnInit() {
      this.restaurantService.getRestaurantByName(this.activatedRoute.snapshot.params['name']).subscribe(
        (data) => {
          this.restaurant = JSON.parse(data['_body']);
        }
      );
  }

}
