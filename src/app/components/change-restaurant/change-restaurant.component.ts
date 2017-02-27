import { Component, OnInit } from '@angular/core';
import {Restaurant} from "../../beans/app.restaurant";
import {RestaurantService} from "../../services/restaurant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../../services/manager.service";
import {Manager} from "../../beans/manager";
import {RestaurantHelp} from "../../beans/helps/restaurant-help";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-change-restaurant',
  templateUrl: './change-restaurant.component.html',
  styleUrls: ['./change-restaurant.component.css']
})
export class ChangeRestaurantComponent implements OnInit {

  private restaurant:Restaurant = new Restaurant();
  private nameExists:boolean=false;
  private managers:Manager[]=[];
  private manager:Manager = new Manager();
  private selectValue:string='';

  constructor(private restaurantService:RestaurantService,private activatedRoute:ActivatedRoute,private router:Router,private managerService:ManagerService) { }

  ngOnInit() {
    this.restaurantService.getRestaurantById(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        this.restaurant = JSON.parse(data['_body']);
        this.restaurantService.getRestaurantManager(this.restaurant).subscribe(
          (data) => {
            this.manager = JSON.parse(data['_body']);
          }
        );
      }
    );

    this.managerService.getAllManagers().subscribe(
      (data) => {
        this.managers = JSON.parse(data['_body']);
      }
    );
  }

  checkRestaurantName(event){
    let val:string = event.srcElement.value;
    if(val == this.restaurant.name){
      return;
    }

    this.restaurantService.checkRestaurantName(val).subscribe(
      (data) => {
        if(data['_body']=='false'){
          this.nameExists=true;
        }else{
          this.nameExists=false;
        }
      }
    );
  }


  onSubmit(rh:RestaurantHelp,form:NgForm){
    if(this.selectValue == ''){
      rh.manager = 'Username:'+this.restaurant.manager.username + ' '+'Name:'+this.restaurant.manager.name;
    }else{
      rh.manager = this.selectValue;
    }
    rh.id = this.restaurant.id;
    this.restaurantService.changeRestaurant(rh).subscribe(
      (data) => {
        this.router.navigateByUrl('/home/restaurants/'+rh.name);
      }
    );
  }

  onSelectChange(event){
    this.selectValue=event.srcElement.value;
  }

}
