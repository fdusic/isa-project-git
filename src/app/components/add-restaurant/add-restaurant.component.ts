import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {Manager} from "../../beans/manager";
import {RestaurantService} from "../../services/restaurant.service";
import {RestaurantHelp} from "../../beans/helps/restaurant-help";
import {Router} from "@angular/router";
declare let sweetAlert:any;


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  private managers:Manager[]=[];
  private managerEmail:string='';
  private nameExists:boolean=false;
  private lat: number = 51.678418;
  private lng: number = 7.809007;

  private rlat:number = -1;
  private rlng:number = -1;

  constructor(private managerService:ManagerService,private restaurantService:RestaurantService,private router:Router) { }

  ngOnInit() {

    this.managerService.getAllManagers().subscribe(
      (data) => {
        this.managers = JSON.parse(data['_body']);
      }
    );
  }


  onSubmit(rh:RestaurantHelp){

      if(this.rlat == -1 && this.rlng==-1){
        sweetAlert("Sorry..", "Please set restaurant position..", "error");
        return;
      }

      rh.lat = this.rlat;
      rh.lng = this.rlng;
      this.restaurantService.addRestaurant(rh).subscribe(
        (data) => {
          this.router.navigateByUrl('/home/restaurants/'+rh.name);
        }
      );
  }


  checkRestaurantName(event){
    let val:string = event.srcElement.value;
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


  onMapClick(event){
    this.rlat = event.coords.lat;
    this.rlng = event.coords.lng;
  }

}
