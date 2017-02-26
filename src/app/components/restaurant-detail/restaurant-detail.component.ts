import {Component, OnInit} from "@angular/core";
import {Restaurant} from "../../beans/app.restaurant";
import {ActivatedRoute} from "@angular/router";
import {RestaurantService} from "../../services/restaurant.service";
import {ViewChild} from "@angular/core/src/metadata/di";
import {MenuItem} from "../../beans/menu-item";
import {RestaurantSegment} from "../../beans/restaurant-segment";
import {RestaurantTable} from "../../beans/restaurant-table";
import {Employee} from "../../beans/employee";
import {Schedule} from "../../beans/schedule";
import {NgForm} from "@angular/forms";
import {isNullOrUndefined} from "util";
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
  @ViewChild('repeatPass') repeatPass : any;
  @ViewChild('username') username : any;
  @ViewChild('schedule') schedule_li : any;


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
  private addEmployee : boolean = false;
  private scheduleBool : boolean = false;

  private restaurant:Restaurant = new Restaurant();
  private menuItems:MenuItem[]=[];
  private foodMenu:MenuItem[]=[];
  private drinkMenu:MenuItem[]=[];

  private finishedConfiguration:boolean = false;


  //OVI SU SAMO ZA PRAVLJENJE NOVE KONFIGURACIJE RESTORANA
  private restaurantSegments:RestaurantSegment[]=[];

  //OVE KORISTITI
  private thisSegments:RestaurantSegment[] = [];

  private errMessage = false;
  private errUsernameMessage = false;

  private schedulesFirst : Schedule[] = [];
  private schedulesSecond : Schedule[] = [];

  private addEmployeeSchedule = false;
  private selectedDate : string;
  private selectedShift : boolean;

  private workers : Employee[] = []

  private freeWorkers : Employee[] = [];

  constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService) { }

  ngOnInit() {
    var date = new Date();
    this.selectedDate = date.getFullYear() + '-' + ((date.getMonth() % 12) + 1) + "-" + date.getDate();
    this.restaurantService.getRestaurantByName(this.activatedRoute.snapshot.params['name']).subscribe(
      (data) => {
        this.restaurant = JSON.parse(data['_body']);
        this.restaurantService.getWorkers(this.restaurant).subscribe(
          data => {
            this.workers = JSON.parse(data['_body']);
          }
        );
      }
    );
  }

  onAddEmployee(){
    this.addMenuItem=false;
    this.home=false;
    this.menu=false;
    this.segments=false;
    this.addEmployee = true;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;

    this.settings_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');
  }

  onAddMenuItem(){
    this.addMenuItem=true;
    this.home=false;
    this.menu=false;
    this.segments=false;
    this.createRestaurantConfiguarion = false;
    this.addEmployee = false;
    this.scheduleBool = false;

    this.settings_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');

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

  onSchedule(){
    let desc = this.restaurant.description;
    this.restaurant.description = 'today';
    this.restaurantService.getSchedules(this.restaurant).subscribe(
      data => {
        this.restaurant.description = desc;
        this.schedulesFirst = [];
        this.schedulesSecond = [];
        this.freeWorkers = [];
        let schedules : Schedule[] = JSON.parse(data['_body']);
        for(var i=0; i < schedules.length; i++){
          if(schedules[i].shift == 'FIRST')
            this.schedulesFirst.push(schedules[i]);
          else
            this.schedulesSecond.push(schedules[i]);
        }

        for(var i=0; i < this.workers.length; i++){
          let flag = true;
          for(var j=0; j < schedules.length; j++){
            if(this.workers[i].id == schedules[j].employee.id){
              flag = false;
              break;
            }
          }
          if(flag)
            this.freeWorkers.push(this.workers[i]);
        }
      }
    );

    this.addMenuItem=false;
    this.home=false;
    this.menu=false;
    this.segments=false;
    this.addEmployee = false;
    this.scheduleBool = true;
    this.createRestaurantConfiguarion = false;

    this.settings_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.add('active');
  }

  onMenuClick(){
    this.addMenuItem=false;
    this.home=false;
    this.menu=true;
    this.segments=false;
    this.createRestaurantConfiguarion = false;
    this.scheduleBool = false;
    this.addEmployee = false;

    this.menu_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');

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
    this.scheduleBool = false;
    this.addEmployee = false;


    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.add('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');

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


  onFinishConfiguration() {
    this.restaurantService.onFinishConfiguration(this.restaurantSegments).subscribe(
      () => {
        swal("Good job!", "You created configuration!", "success");
        /*this.addMenuItem = false;
        this.home = false;
        this.menu = false;
        this.segments = true;
        this.createRestaurantConfiguarion = false;
        this.scheduleBool = false;

        this.menu_li.nativeElement.classList.remove('active');
        this.home_li.nativeElement.classList.remove('active');
        this.settings_li.nativeElement.classList.remove('active');
        this.segments_li.nativeElement.classList.add('active');
        this.schedule_li.nativeElement.classList.remove('active');*/
        this.onSegmentsClick();
        this.finishedConfiguration = true;
      });
  }

  onSubmitAddEmployee(emp : Employee, repeatPassword : string){
    if(emp.password != repeatPassword){
      this.errMessage = true;
      this.repeatPass.nativeElement.value = '';
      return;
    } else{
      this.errMessage = false;
    }

    emp.restaurant = this.restaurant;

    this.restaurantService.addEmployee(emp).subscribe(
      () => {
        swal("Good job!", "You added a new employee!", "success");
        var dirtyFormID = 'modifyEmpForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
      }
    );
  }

  checkEmployeeUsername(username : string){
    this.restaurantService.checkEmployeeUsername(username).subscribe(
      data => {
        if(data['_body'] == 'true'){
          this.errUsernameMessage = true;
          this.username.nativeElement.value = ''
        } else{
          this.errUsernameMessage = false;
        }
      }
    );
  }

  dateChange(event){
    this.selectedDate = event.srcElement.value.toString();
    let desc = this.restaurant.description;
    if(event.srcElement.value.toString() == '') {
      this.schedulesFirst = [];
      this.schedulesSecond = [];
      return;
    }
    this.restaurant.description = event.srcElement.value.toString();
    this.restaurantService.getSchedules(this.restaurant).subscribe(
      data => {
        this.restaurant.description = desc;
        let schedules : Schedule[] = JSON.parse(data['_body']);
        this.schedulesSecond = [];
        this.schedulesFirst = [];
        for(var i=0; i < schedules.length; i++){
          if(schedules[i].shift == 'FIRST')
            this.schedulesFirst.push(schedules[i]);
          else
            this.schedulesSecond.push(schedules[i]);
        }
        this.freeWorkers = [];
        for(var i=0; i < this.workers.length; i++){
          let flag = true;
          for(var j=0; j < schedules.length; j++){
            if(this.workers[i].id == schedules[j].employee.id){
              flag = false;
              break;
            }
          }
          if(flag)
            this.freeWorkers.push(this.workers[i]);
        }
      }
    );
  }

  onCloseAddEmployeeSchedule(){
    this.addEmployeeSchedule = false;
  }

  onAddEmployeeSchedule(firstShift : boolean){
    if(this.freeWorkers.length == 0){
      swal("Error!", "All workers are already scheduled for today!", "error")
    } else
      this.addEmployeeSchedule = true;

    this.selectedShift = firstShift;
  }

  onSaveEmployeeSchedule(form : NgForm){
    let newS = new Schedule();
    newS.employee = this.freeWorkers[form.controls['selectedWorker'].value];
    if(this.selectedShift)
      newS.shift = 'FIRST';
    else
      newS.shift = 'SECOND';
    newS.restaurant = this.restaurant;
    let desc = this.restaurant.description;
    if(isNullOrUndefined(this.selectedDate))
      newS.restaurant.description = 'today';
    else
      newS.restaurant.description = this.selectedDate.toString();
    this.restaurantService.addSchedule(newS).subscribe(
      () => {
        this.onCloseAddEmployeeSchedule();

        if(this.selectedShift)
          this.schedulesFirst.push(newS);
        else
          this.schedulesSecond.push(newS);
        this.freeWorkers.splice(form.controls['selectedWorker'].value,1);
        this.restaurant.description = desc;
      }
    );
  }

  onSegmentsClick(){
    this.addMenuItem=false;
    this.home=false;
    this.menu=false;
    this.segments=true;
    this.createRestaurantConfiguarion = false;
    this.scheduleBool = false;
    this.addEmployee = false;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.add('active');
    this.schedule_li.nativeElement.classList.remove('active');

    this.restaurantService.getRestaurantSegments(this.restaurant).subscribe(
      (data) => {
          this.thisSegments = JSON.parse(data['_body']);
          if(this.thisSegments.length > 0){
            this.finishedConfiguration=true;
          }
      }
    );
  }

  onRemoveEmployeeSchedule(emp : Employee){
    console.log(emp);
    console.log(emp.id);
    let s = new Schedule();
    let desc = this.restaurant.description;
    let d = this.restaurant;
    if(isNullOrUndefined(this.selectedDate))
      this.restaurant.description = 'today';
    else
      this.restaurant.description = this.selectedDate.toString();
    s.restaurant = this.restaurant;
    s.employee = emp;
    let service = this.restaurantService;
    let fw = this.freeWorkers;
    let sf = this.schedulesFirst;
    let ss = this.schedulesSecond;
    swal({
        title: "Delete employee shift",
        text: "Are you shure you wan't to delete this employee's shift?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function(){
        service.removeSchedule(s).subscribe(
          () => {
            swal("Deleted!", "The worker is free today.", "success");
            d.description = desc;
            fw.push(emp);
            for(let i=0; i < sf.length; i++){
              console.log(sf[i]);
              if(sf[i].employee.id == emp.id){
                sf.splice(i,1);
                return;
              }
            }
            for(let i=0; i < ss.length; i++){
              if(ss[i].employee.id == emp.id){
                ss.splice(i,1);
                return;
              }
            }
          }
        );
      });
  }
}
