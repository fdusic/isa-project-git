import { Component, OnInit } from '@angular/core';
import {Restaurant} from "../../beans/app.restaurant";
import {ActivatedRoute} from "@angular/router";
import {RestaurantService} from "../../services/restaurant.service";
import {ViewChild} from "@angular/core/src/metadata/di";
import {MenuItem} from "../../beans/menu-item";
declare let sweetAlert : any;
declare let swal : any;

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  //Za Li-jeve
  @ViewChild('home_li') home_li : any;
  @ViewChild('settings_li') settings_li : any;
  @ViewChild('menu_li') menu_li : any;
  @ViewChild('segments_li') segments_li : any;

  //Promenljive za prikazivanje odgovarajuceg div-a
  private addMenuItem:boolean=false;
  private home:boolean=false;
  private segments:boolean=false;
  private menu:boolean=false;

  private restaurant:Restaurant = new Restaurant();
  private menuItems:MenuItem[]=[];
  private foodMenu:MenuItem[]=[];
  private drinkMenu:MenuItem[]=[];
  constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService) { }

  ngOnInit() {
      this.restaurantService.getRestaurantByName(this.activatedRoute.snapshot.params['name']).subscribe(
        (data) => {
          this.restaurant = JSON.parse(data['_body']);
        }
      );
  }


  onAddMenuItem(){
    this.addMenuItem=true;
    this.home=false;
    this.menu=false;
    this.segments=false;

    this.settings_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
  }


  onSubmitMenuItem(mi:MenuItem){
    mi.restaurant = this.restaurant;
    this.restaurantService.addMenuItem(mi).subscribe(
      (data) => {
          if(data['_body']=='false'){
            sweetAlert("Ouups!", "Menu item with same name already exist.", "error");
          }else{
            swal("Good job!", "You added menu item!", "success");
            var dirtyFormID = 'menuItemForm';
            var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
            resetForm.reset();
          }
      }
    );
  }


  onMenuClick(){
    this.addMenuItem=false;
    this.home=false;
    this.menu=true;
    this.segments=false;

    this.menu_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');

    this.restaurantService.getMenuItems(this.restaurant).subscribe(
      (data) => {
        this.menuItems = JSON.parse(data['_body']);
        this.foodMenu = [];
        this.drinkMenu = [];
        for(var i = 0; i < this.menuItems.length;i++){
          if(this.menuItems[i].menuItemType=='FOOD'){
            this.foodMenu.push(this.menuItems[i]);
          }else{
            this.drinkMenu.push(this.menuItems[i]);
          }
        }
      }
    );
  }

}
