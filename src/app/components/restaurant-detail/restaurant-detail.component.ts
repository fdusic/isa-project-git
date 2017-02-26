import { Component, OnInit } from '@angular/core';
import {Restaurant} from "../../beans/app.restaurant";
import {ActivatedRoute} from "@angular/router";
import {RestaurantService} from "../../services/restaurant.service";
import {ViewChild} from "@angular/core/src/metadata/di";
import {MenuItem} from "../../beans/menu-item";
import {NgForm} from "@angular/forms";
import {RestaurantSegment} from "../../beans/restaurant-segment";
import {RestaurantTable} from "../../beans/restaurant-table";
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


  //ZA kreiranje konfiguracije rastorana i segmenata
  @ViewChild('segments_div') segments_div : any;
  @ViewChild('segments_name_div') segments_name_div : any;
  @ViewChild('segments_a') segments_a : any;
  @ViewChild('segments_name_a') segments_name_a : any;
  @ViewChild('schedule_a') schedule_a : any;
  @ViewChild('schedule_div') schedule_div : any;
  @ViewChild('finish_a') finish_a : any;
  @ViewChild('finish_div') finish_div : any;




  //Za drag and drop stolova
  private currentMatrix:any;
  private currentX = 0;
  private currentY = 0;
  private selectedElement:any;
  private mouseDown:boolean = false;


  //Za izabran broj segmenata
  private numberOfSegments:number[] = [];


  //Promenljive za prikazivanje odgovarajuceg div-a
  private addMenuItem:boolean=false;
  private createRestaurantConfiguarion:boolean = false;
  private home:boolean=false;
  private segments:boolean=false;
  private menu:boolean=false;

  private restaurant:Restaurant = new Restaurant();
  private menuItems:MenuItem[]=[];
  private foodMenu:MenuItem[]=[];
  private drinkMenu:MenuItem[]=[];


  private finishedConfiguration:boolean = false;


  //OVI SU SAMO ZA PRAVLJENJE NOVE KONFIGURACIJE RESTORANA
  private restaurantSegments:RestaurantSegment[]=[];

  //OVE KORISTITI
  private thisSegments:RestaurantSegment[] = [];


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
    this.createRestaurantConfiguarion = false;

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
    this.createRestaurantConfiguarion = false;

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


  onCreateRestaurantConfiguration(){

    if(this.finishedConfiguration){
      sweetAlert("Sorry!", "You already created configuration.", "error");
      return;
    }

    this.addMenuItem=false;
    this.home=false;
    this.menu=false;
    this.segments=false;
    this.createRestaurantConfiguarion = true;


    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.add('active');
    this.segments_li.nativeElement.classList.remove('active');

  }

  selectElement(event){
    this.mouseDown=true;
    this.selectedElement = event.target;
    this.currentMatrix = this.selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

    this.currentX = event.clientX;
    this.currentY = event.clientY;


    for(var i=0; i<this.currentMatrix.length; i++) {

      this.currentMatrix[i] = parseFloat(this.currentMatrix[i]);

    }


  }


   moveElement(evt){

    if(this.mouseDown){
      let dx:any = evt.clientX - this.currentX;
      let dy:any = evt.clientY - this.currentY;
      this.currentMatrix[4] += dx;
      this.currentMatrix[5] += dy;
      let newMatrix:any = "matrix(" + this.currentMatrix.join(' ') + ")";
      this.selectedElement.setAttributeNS(null, "transform", newMatrix);
      this.currentX = evt.clientX;
      this.currentY = evt.clientY;
    }

  }


  unselectElement(table:RestaurantTable,event){
    this.mouseDown=false;
    table.x = this.currentMatrix[4];
    table.y = this.currentMatrix[5];
  }


  onNext(){
    if(this.segments_div.nativeElement.classList.contains('active') && this.segments_a.nativeElement.classList.contains('active')){
      if(this.numberOfSegments.length==0){
        sweetAlert("Ouups!", "Select number of segments.", "error");
        return;
      }
      this.segments_div.nativeElement.classList.remove('active');
      this.segments_name_div.nativeElement.classList.add('active');
      this.segments_a.nativeElement.classList.remove('active');
      this.segments_name_a.nativeElement.classList.add('active');
      return;
    }





  }


  selectNumberOfSegments(event){
    this.numberOfSegments=[];
    for(var i = 0;i < event.srcElement.value;i++){
      this.numberOfSegments.push(i);
    }
  }


  onSegmentsNameSubmit(form:NgForm){
    let segs:string[]=[];
    for(var i = 0; i < this.numberOfSegments.length; i++){
      segs.push(form.controls['segmentName'+i].value);
    }

    for(var i = 0; i < segs.length; i++){
      for(var j = 0; j < segs.length; j++){
        if(i != j){
          if(segs[i]==segs[j]){
            sweetAlert("Ouups!", "Segment must have unique name.", "error");
            return;
          }
        }
      }
    }

    this.restaurantSegments=[];

    for(var i = 0; i < this.numberOfSegments.length; i++){
      let rs:RestaurantSegment = new RestaurantSegment();
      rs.name = form.controls['segmentName'+i].value;
      rs.restaurant = this.restaurant;
      let posx:number=0;
      let posy:number=0;
      for(var j=0; j < form.controls['numberOfTables'+i].value;j++){
        let rt:RestaurantTable = new RestaurantTable();

        if(j%3==0 && j!=0){
          posx = 0;
          posy += 80;
        }

        rt.startX = posx;
        rt.startY = posy;
        posx += 140;
        rt.x = rt.startX;
        rt.y = rt.startY;
        rs.tables.push(rt);
      }

      this.restaurantSegments.push(rs);
    }


    if(this.segments_name_div.nativeElement.classList.contains('active') && this.segments_name_a.nativeElement.classList.contains('active')){
      this.schedule_a.nativeElement.classList.add('active');
      this.segments_name_div.nativeElement.classList.remove('active');
      this.schedule_div.nativeElement.classList.add('active');
      this.segments_name_a.nativeElement.classList.remove('active');
      return;
    }

  }


  onNextToFinish(){
    if(this.schedule_a.nativeElement.classList.contains('active') && this.schedule_div.nativeElement.classList.contains('active')){
      this.schedule_a.nativeElement.classList.remove('active');
      this.finish_a.nativeElement.classList.add('active');
      this.schedule_div.nativeElement.classList.remove('active');
      this.finish_div.nativeElement.classList.add('active');
      return;
    }
  }


  onFinishConfiguration(){
    this.restaurantService.onFinishConfiguration(this.restaurantSegments).subscribe(
      () => {
        swal("Good job!", "You created configuration!", "success");
        this.addMenuItem=false;
        this.home=false;
        this.menu=false;
        this.segments=true;
        this.createRestaurantConfiguarion = false;

        this.menu_li.nativeElement.classList.remove('active');
        this.home_li.nativeElement.classList.remove('active');
        this.settings_li.nativeElement.classList.remove('active');
        this.segments_li.nativeElement.classList.add('active');
        this.finishedConfiguration = true;

      }
    );
  }

  onSegmentsClick(){
    this.addMenuItem=false;
    this.home=false;
    this.menu=false;
    this.segments=true;
    this.createRestaurantConfiguarion = false;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.add('active');


    this.restaurantService.getRestaurantSegments(this.restaurant).subscribe(
      (data) => {
          this.thisSegments = JSON.parse(data['_body']);
          if(this.thisSegments.length > 0){
            this.finishedConfiguration=true;
          }
      }
    );
  }

}
