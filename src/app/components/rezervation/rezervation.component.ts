import { Component, OnInit } from '@angular/core';
import {ViewChild} from "@angular/core/src/metadata/di";
import {Restaurant} from "../../beans/app.restaurant";
import {RestaurantService} from "../../services/restaurant.service";
import {RezervationHelp} from "../../beans/helps/rezervation-help";
import {RestaurantSegment} from "../../beans/restaurant-segment";
import {RestaurantTable} from "../../beans/restaurant-table";
import {User} from "../../beans/user";
import {LoginRegisterService} from "../../services/login-register.service";
import {InviteHelp} from "../../beans/helps/invite-help";
import {MenuItem} from "../../beans/menu-item";
import {RezervationOrder} from "../../beans/rezervation-order";
import {Rezervation} from "../../beans/rezervation";
import {Router} from "@angular/router";
import {RezervationInvite} from "../../beans/rezervation-invite";
import {TableVersions} from "../../beans/table-versions";


declare let swal:any;

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



  @ViewChild('pre_prepared_check') pre_prepared_check : any;


  private date: any;
  private showTimePicker: boolean;
  private time:any;
  private selectedDate:boolean = false;
  private inputTime:string='';
  private today:boolean = false;
  private badHours:boolean = true;



  //ZA DURATION
  private durationTimeInput:string='';
  private durationTime:any;
  private showDurationTimePicker:boolean = false;


  //ZA DUZINU RADA RESTORANA
  private restaurantWorks:boolean = true;




  private restaurants:Restaurant[]=[];
  private restaurantSelected:boolean = false;
  private selectedRestaurant:Restaurant = new Restaurant();


  private segments:RestaurantSegment[]=[];


  private selectedTables:RestaurantTable[]=[];
  private friends:User[]=[];
  private sentInvites:User[]=[];


  private menuItems:MenuItem[]=[];
  private foodMenu:MenuItem[]=[];
  private drinkMenu:MenuItem[]=[];


  private rezervationOrder:RezervationOrder = new RezervationOrder();

  constructor(private restaurantService:RestaurantService,private loginRegisterService:LoginRegisterService,private router:Router) { }

  ngOnInit() {

    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = JSON.parse(data['_body']);
      }
    );


    this.loginRegisterService.getFriends().subscribe(
      (data) => {
        this.friends = JSON.parse(data['_body']);
      }
    );
  }


  onRestaurantSelect(r:Restaurant) {
    this.selectedRestaurant = r;
    document.getElementById("restaurant" + r.id).style.backgroundColor = "#81ff6d";
    this.restaurantSelected = true;
    for(let res of this.restaurants){
      if(res.id != r.id){
        document.getElementById("restaurant"+res.id).style.removeProperty('background-color');
      }
    }

  }

  onNext(){

    if(this.restaurantSelected == false){
      swal("Sorry!", "You must select restaurant.", "error")
      return;
    }
    if(this.selectedDate == false){
      swal("Sorry!", "You selected wrong date.", "error")
      return;
    }

    if(this.badHours == false){
      swal("Sorry!", "You selected wrong time.", "error")
      return;
    }

    if(this.restaurantWorks == false){
      swal("Sorry!", "Restaurant works untill 23:00h.", "error");
      return;
    }


    let rh:RezervationHelp = new RezervationHelp();
    rh.restaurant = this.selectedRestaurant;
    rh.date = this.date;
    rh.time = this.inputTime;
    rh.duration = this.durationTimeInput;
    let bool:boolean = false;
    this.restaurantService.getAvailableTables(rh).subscribe(
      (data) => {
          this.segments = JSON.parse(data['_body']);
        //console.log(this.segments[0].tables[0].tableVersions);
        //console.log(this.segments[0].tables[1].tableVersions);
        for(let s of this.segments){
          if(s.tables.length > 0){
            bool = true;
            break;
          }
        }

        if(bool == false){
          swal("Sorry!", "All tables are reserved at "+this.inputTime+" for "+this.durationTimeInput+" duration.", "error");
          return;
        }

        this.restaurants_a.nativeElement.classList.remove('active');
        this.tables_div.nativeElement.classList.add('active');
        this.restaurants_div.nativeElement.classList.remove('active');
        this.tables_a.nativeElement.classList.add('active');
      }
    );

  }

  toggleTimePicker(status: boolean): void  {
    if(!this.selectedDate){
      swal("Sorry!", "Date is wrong or not selected.", "error")
      return;
    }

    this.showTimePicker = status;
  }

  setTime(time: any): void {
    if(time == null){
      this.time = time;
      return;
    }

    let temp:string[] = time.toString().split(' ')[4].split(':');
    this.inputTime = temp[0]+':'+temp[1];
    this.time = time;

    let d:Date = new Date();

    if(this.today){
      if(+temp[0]<d.getHours()){
        this.badHours = false;
      }else if(+temp[0] > d.getHours()){
        this.badHours = true;
      }else{
        if(+temp[1] > d.getMinutes()){
          this.badHours = true;
        }else if(+temp[1] < d.getMinutes()){
          this.badHours = false;
        }else{
          this.badHours = false;
        }
      }
    }

  }

  dateChange(event){
    let d:Date = new Date();
    let e:string[] = event.srcElement.value.toString().split('-');
    this.date = event.srcElement.value.toString();
    let ret:string=this.compareDates(d.getDate(),+e[2],d.getMonth()+1,+e[1],d.getFullYear(),+e[0]);
    if(ret == 'less'){
      this.selectedDate = false;
    }else{
      this.selectedDate = true;
    }
  }


  compareDates(d1:number,d2:number,m1:number,m2:number,y1:number,y2:number){
    if(y1 > y2){
      return "less";
    }

    if(y1 < y2){
      return "ok";
    }

    if(y1 == y2){
      if(m1 > m2){
        return "less";
      }else if(m1 < m2){
        return "ok";
      }else{
        if(d1 > d2){
          return "less";
        }else if(d1 < d2){
          return "ok";
        }else{
          this.today = true;
          return "same";
        }
      }
    }

  }

  //ZA DURATION
  toggleDurationTimePicker(status: boolean): void  {
    if(!this.badHours){
      swal("Sorry!", "First select valid time.", "error");
      return;
    }

    this.showDurationTimePicker = status;
  }


  setDurationTime(time: any): void {
    if(time == null){
      this.durationTime = time;
      return;
    }

    let temp:string[] = time.toString().split(' ')[4].split(':');
    this.durationTimeInput = temp[0]+':'+temp[1];
    this.durationTime = time;


    let valH:number = +temp[0] + +this.inputTime.split(':')[0];
    if(valH > 23){
      this.restaurantWorks = false;
    }else if(valH == 23){
      let valM:number = +temp[1] + +this.inputTime.split(':')[1];
      if(valM != 0){
        this.restaurantWorks = false;
      }else{
        this.restaurantWorks = true;
      }
    }else{
      let valM:number = +temp[1] + +this.inputTime.split(':')[1];
      if(valM > 60){
        valH += 1;
        valM = valM%60;
        if(valH == 23){
          if(valM != 0){
            this.restaurantWorks = false;
          }else{
            this.restaurantWorks = true;
          }
        }else{
          this.restaurantWorks = true;
        }

      }else{
        this.restaurantWorks = true;
      }
    }
  }
  onTableClick(table:RestaurantTable){
    if(document.getElementById('animate'+table.id).getAttribute('values') == null){
      document.getElementById('animate'+table.id).setAttribute("attributeName", "opacity");
      document.getElementById('animate'+table.id).setAttribute("values", "0;1;0");
      document.getElementById('animate'+table.id).setAttribute("dur", "1s");
      document.getElementById('animate'+table.id).setAttribute("repeatCount", "indefinite");
      this.selectedTables.push(table);
    }else{
      document.getElementById('animate'+table.id).removeAttribute("attributeName");
      document.getElementById('animate'+table.id).removeAttribute("values");
      document.getElementById('animate'+table.id).removeAttribute("dur");
      document.getElementById('animate'+table.id).removeAttribute("repeatCount");
      var index = this.selectedTables.indexOf(table, 0);
      if (index > -1) {
        this.selectedTables.splice(index, 1);
      }

    }
  }

  onNextToInviteFriends(){
    if(this.selectedTables.length == 0){
      swal("Sorry!", "Please select table you would like to reserve.", "error");
      return;
    }

    this.friends_a.nativeElement.classList.add('active');
    this.tables_div.nativeElement.classList.remove('active');
    this.friends_div.nativeElement.classList.add('active');
    this.tables_a.nativeElement.classList.remove('active');

  }


  sendInvite(friend:User){
    this.sentInvites.push(friend);
    document.getElementById('button'+friend.email).setAttribute('disabled','true');
    swal("Success!", "You invited "+friend.name+' '+friend.surname+'.', "success");
  }


  onNextToOrders(){
    this.restaurantService.getMenuItems(this.selectedRestaurant).subscribe(
      (data) => {
        this.menuItems = JSON.parse(data['_body']);
        this.foodMenu = [];
        this.drinkMenu = [];
        for (var i = 0; i < this.menuItems.length; i++) {
          if (this.menuItems[i].menuItemType == 'FOOD') {
            this.foodMenu.push(this.menuItems[i]);
          } else {
            this.drinkMenu.push(this.menuItems[i]);
          }
        }
      }
    );

    this.friends_a.nativeElement.classList.remove('active');
    this.orders_a.nativeElement.classList.add('active');
    this.friends_div.nativeElement.classList.remove('active');
    this.orders_div.nativeElement.classList.add('active');
  }

  addToOrders(menuItem:MenuItem){
    this.rezervationOrder.menuItems.push(menuItem);
    if(menuItem.menuItemType == 'FOOD'){
      document.getElementById('fooda'+menuItem.id).setAttribute('disabled','true');
    }else{
      document.getElementById('drinka'+menuItem.id).setAttribute('disabled','true');
    }
  }

  onPrePrepare(){
    if(this.pre_prepared_check.nativeElement.checked){
      this.rezervationOrder.finished = true;
    }else{
      this.rezervationOrder.finished = false;
    }
  }

  onSaveRezervation(){
    let rezervation:Rezervation = new Rezervation();
    rezervation.date= this.date;
    rezervation.time = this.inputTime;
    rezervation.duration = this.durationTimeInput;
    rezervation.restaurant = this.selectedRestaurant;
    rezervation.serviceRate = 0;
    rezervation.orderRate = 0;


    for(let u of this.sentInvites){
      let ri:RezervationInvite = new RezervationInvite();
      ri.status = 0;
      ri.invitedUser = u;
      rezervation.rezervationInvites.push(ri);
    }

    if(this.rezervationOrder.menuItems.length > 0){
      rezervation.rezervationOrders.push(this.rezervationOrder);
    }
    rezervation.tables = this.selectedTables;
    for(let r of rezervation.tables){
      console.log(r.tableVersions);
      console.log(r.tableVersions == null);
      if(r.tableVersions == null) {
        let tv = new TableVersions();
        r.tableVersions = [];
        r.tableVersions.push(tv);
        tv.date = rezervation.date;
        tv.version = -1;
      }
    }
    this.restaurantService.saveRezervation(rezervation).subscribe(
      (data) => {
          if(data['_body']=='true'){
            swal("Success!", "You rezervated "+this.selectedRestaurant.name+' at '+this.date+'.', "success");
            this.router.navigateByUrl('home/restaurants/'+this.selectedRestaurant.name);
          }else{
            swal("Sorry!", "Someone has just rezervated one of your tables.", "error");
            this.router.navigateByUrl('home/restaurants/'+this.selectedRestaurant.name);
          }
      }
    );


  }




}
