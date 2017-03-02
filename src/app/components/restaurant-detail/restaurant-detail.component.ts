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
import {UserGrade} from "../../beans/user-grade";
import {Supplier} from "../../beans/supplier";
import {Purchase} from "../../beans/purchase";
import {PurchaseSupplier} from "../../beans/purchase-supplier";
import {RoleService} from "../../services/role.service";
declare let sweetAlert: any;
declare let swal: any;


@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {



  //Za Li-jeve
  @ViewChild('home_li') home_li: any;
  @ViewChild('settings_li') settings_li: any;
  @ViewChild('menu_li') menu_li: any;
  @ViewChild('segments_li') segments_li: any;
  @ViewChild('repeatPass') repeatPass: any;
  @ViewChild('repeatSupplierPass') repeatSupplierPass: any;
  @ViewChild('username') username: any;
  @ViewChild('usernameSupplier') usernameSupplier: any;
  @ViewChild('schedule') schedule_li: any;



  //ZA kreiranje konfiguracije rastorana i segmenata
  @ViewChild('segments_div') segments_div: any;
  @ViewChild('segments_name_div') segments_name_div: any;
  @ViewChild('segments_a') segments_a: any;
  @ViewChild('segments_name_a') segments_name_a: any;
  @ViewChild('schedule_a') schedule_a: any;
  @ViewChild('schedule_div') schedule_div: any;
  @ViewChild('finish_a') finish_a: any;
  @ViewChild('finish_div') finish_div: any;

  @ViewChild('google_map') google_map : any;



  //TEST GOOGLE MAPE
  private lat: number = 51.678418;
  private lng: number = 7.809007;




  //Za drag and drop stolova
  private currentMatrix: any;
  private currentX = 0;
  private currentY = 0;
  private selectedElement: any;
  private mouseDown: boolean = false;


  //Za izabran broj segmenata
  private numberOfSegments: number[] = [];


  //ZA CHANGE SEGMENTA
  private segmentForChange: RestaurantSegment = new RestaurantSegment();
  private segNameExists: boolean = false;


  //Promenljive za prikazivanje odgovarajuceg div-a
  private addMenuItem: boolean = false;
  private createRestaurantConfiguarion: boolean = false;
  private home: boolean = true;
  private segments: boolean = false;
  private menu: boolean = false;
  private addEmployee: boolean = false;
  private scheduleBool: boolean = false;
  private addSupplier: boolean = false;
  private addPurchase: boolean = false;
  private managePurchases : boolean = false;

  private menuItemForChange: MenuItem = new MenuItem();

  private restaurant: Restaurant = new Restaurant();
  private menuItems: MenuItem[] = [];
  private foodMenu: MenuItem[] = [];
  private drinkMenu: MenuItem[] = [];

  private isManager = false;

  private finishedConfiguration: boolean = false;


  //OVI SU SAMO ZA PRAVLJENJE NOVE KONFIGURACIJE RESTORANA
  private restaurantSegments: RestaurantSegment[] = [];

  //OVE KORISTITI
  private thisSegments: RestaurantSegment[] = [];

  private errMessage = false;
  private errSupplierMessage = false;
  private errUsernameMessage = false;
  private errUsernameSupplierMessage = false;

  private schedulesFirst: Schedule[] = [];
  private schedulesSecond: Schedule[] = [];

  private addEmployeeSchedule = false;
  private selectedDate: string;
  private selectedShift: boolean;

  private workers: Employee[] = []

  private freeWorkers: Employee[] = [];

  private changeNameExists: boolean = false;
  private addSegmentsBool = false;
  private selectedEmp: Employee;

  private purchasSupplierPending : PurchaseSupplier[] = [];
  private purchases : Purchase[] = [];

  constructor(private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService, private roleService : RoleService) {
  }

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
        this.restaurantService.getRestaurantSegments(this.restaurant).subscribe(
          (data) => {
            this.thisSegments = JSON.parse(data['_body']);
            if (this.thisSegments.length > 0) {
              this.finishedConfiguration = true;
            }
          }
        );
        if(!this.roleService.manager)
          this.isManager = false;
        else {
          this.restaurantService.isManager(this.restaurant.manager.id).subscribe(
            data => {
              this.isManager = data['_body'] == 'true';
            }
          );
        }
      }
    );
  }

  onAddPurchase() {
    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = true;
    this.managePurchases = false;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.add('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');
  }

  onSubmitAddPurchase(purchase: Purchase) {
    purchase.restaurant = this.restaurant;
    this.restaurantService.addPurchase(purchase).subscribe(
      () => {
        var dirtyFormID = 'purchaseForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
      }
    );
  }


  onHomeClick() {
    this.addMenuItem = false;
    this.home = true;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

    this.settings_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.add('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');
  }

  onAddEmployee() {
    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = true;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

    this.settings_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');
  }

  onCloseAddSegmentsDialog() {
    this.addSegmentsBool = false;
  }

  onAddMenuItem() {
    this.addMenuItem = true;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

    this.settings_li.nativeElement.classList.add('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');

  }

  onSubmitMenuItem(mi: MenuItem) {
    mi.restaurant = this.restaurant;
    this.restaurantService.addMenuItem(mi).subscribe(
      (data) => {
        if (data['_body'] == 'false') {
          sweetAlert("Ouups!", "Menu item with same name already exist.", "error");
        } else {
          swal("Good job!", "You added menu item!", "success");
          var dirtyFormID = 'menuItemForm';
          var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
          resetForm.reset();
        }
      }
    );
  }

  onAddSupplier() {
    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = true;
    this.addPurchase = false;
    this.managePurchases = false;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.add('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');
  }

  checkSupplierUsername(username: string) {
    console.log(username);
    this.restaurantService.checkSupplierUsername(username).subscribe(
      data => {
        console.log(data['_body']);
        if (data['_body'] == 'true') {
          this.errUsernameSupplierMessage = true;
          this.usernameSupplier.nativeElement.value = ''
        } else {
          this.errUsernameSupplierMessage = false;
        }
      }
    );
  }

  onSubmitAddSupplier(supplier: Supplier, repeatPassword: string) {
    if (supplier.password != repeatPassword) {
      this.errSupplierMessage = true;
      this.repeatSupplierPass.nativeElement.value = '';
      return;
    } else {
      this.errSupplierMessage = false;
    }
    this.restaurantService.addSupplier(supplier).subscribe(
      () => {
        swal("Good job!", "You added a new supplier!", "success");
        var dirtyFormID = 'addSupplierForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
      }
    );
  }

  onSchedule() {
    let desc = this.restaurant.description;
    this.restaurant.description = 'today';
    this.restaurantService.getSchedules(this.restaurant).subscribe(
      data => {
        this.restaurant.description = desc;
        this.schedulesFirst = [];
        this.schedulesSecond = [];
        this.freeWorkers = [];
        let schedules: Schedule[] = JSON.parse(data['_body']);
        for (var i = 0; i < schedules.length; i++) {
          if (schedules[i].shift == 'FIRST')
            this.schedulesFirst.push(schedules[i]);
          else
            this.schedulesSecond.push(schedules[i]);
        }

        for (var i = 0; i < this.workers.length; i++) {
          let flag = true;
          for (var j = 0; j < schedules.length; j++) {
            if (this.workers[i].id == schedules[j].employee.id) {
              flag = false;
              break;
            }
          }
          if (flag)
            this.freeWorkers.push(this.workers[i]);
        }
      }
    );

    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = true;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

    this.settings_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.menu_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.add('active');
  }

  onMenuClick() {
    this.addMenuItem = false;
    this.home = false;
    this.menu = true;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

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
        for (var i = 0; i < this.menuItems.length; i++) {
          if (this.menuItems[i].menuItemType == 'FOOD') {
            this.foodMenu.push(this.menuItems[i]);
          } else {
            this.drinkMenu.push(this.menuItems[i]);
          }
        }
      }
    );
  }

  onManagePurchases(){
    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = true;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.add('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');

    this.restaurantService.getPurchaseSupplierRestaurant(this.restaurant).subscribe(
      data => {
        this.purchasSupplierPending = JSON.parse(data['_body']);
        console.log(this.purchasSupplierPending);
        for(let i=0; i < this.purchasSupplierPending.length; i++){
          let flag = true;
          for(let j=0; j < this.purchases.length; j++){
            if(this.purchasSupplierPending[i].purchase.id == this.purchases[j].id){
              flag = false;
              break;
            }
          }
          if(flag){
            this.purchases.push(this.purchasSupplierPending[i].purchase);
          }
        }
      }
    );
  }

  getOffersForPurches(pur : Purchase){
    let ret : PurchaseSupplier[] = [];
    for(let i=0; i < this.purchasSupplierPending.length; i++){
      if(this.purchasSupplierPending[i].purchase.id == pur.id){
        ret.push(this.purchasSupplierPending[i]);
      }
    }
    return ret;
  }

  acceptOffer(ps : PurchaseSupplier, p : Purchase){
    let service = this.restaurantService;
    let psp = this.purchasSupplierPending;
    let remove = this.purchases;
    swal({
        title: "Are you sure?",
        text: "Maybe some better offers will come.",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Confirm",
        closeOnConfirm: false
      },
      function(){
          let ret : PurchaseSupplier[] = [];
          for(let i=0; i < psp.length; i++){
            if(psp[i].purchase.id == p.id){
              if(psp[i] == ps){
                psp[i].status = 'ACCEPTED';
              } else{
                psp[i].status = 'DECLINED';
              }
              ret.push(psp[i]);
            }
          }
        service.acceptSupplierOffer(ret).subscribe(
            (data) => {
              if(data['_body'] == 'true') {
                swal("Accepted!", "You successfully accepted the offer.", "success");
                remove.splice(remove.indexOf(p), 1);
              } else{
                swal("Error!", "It seems that the supplier has removed or modified his offer.", "error");
                location.reload();
              }
            }
          );
      });
  }

  onCreateRestaurantConfiguration() {

    if (this.finishedConfiguration) {
      sweetAlert("Sorry!", "You already created configuration.", "error");
      return;
    }

    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = false;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = true;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.add('active');
    this.segments_li.nativeElement.classList.remove('active');
    this.schedule_li.nativeElement.classList.remove('active');

  }

  onSegmentsClick() {
    this.addMenuItem = false;
    this.home = false;
    this.menu = false;
    this.segments = true;
    this.addEmployee = false;
    this.scheduleBool = false;
    this.createRestaurantConfiguarion = false;
    this.addSupplier = false;
    this.addPurchase = false;
    this.managePurchases = false;

    this.menu_li.nativeElement.classList.remove('active');
    this.home_li.nativeElement.classList.remove('active');
    this.settings_li.nativeElement.classList.remove('active');
    this.segments_li.nativeElement.classList.add('active');
    this.schedule_li.nativeElement.classList.remove('active');

    this.restaurantService.getRestaurantSegments(this.restaurant).subscribe(
      (data) => {
        this.thisSegments = JSON.parse(data['_body']);
        if (this.thisSegments.length > 0) {
          this.finishedConfiguration = true;
        }
      }
    );
  }

  selectElement(event) {
    this.mouseDown = true;
    this.selectedElement = event.target;
    this.currentMatrix = this.selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');

    this.currentX = event.clientX;
    this.currentY = event.clientY;


    for (var i = 0; i < this.currentMatrix.length; i++) {

      this.currentMatrix[i] = parseFloat(this.currentMatrix[i]);

    }
  }
  moveElement(evt) {

    if (this.mouseDown) {
      let dx: any = evt.clientX - this.currentX;
      let dy: any = evt.clientY - this.currentY;
      this.currentMatrix[4] += dx;
      this.currentMatrix[5] += dy;
      let newMatrix: any = "matrix(" + this.currentMatrix.join(' ') + ")";
      this.selectedElement.setAttributeNS(null, "transform", newMatrix);
      this.currentX = evt.clientX;
      this.currentY = evt.clientY;
    }
  }


  unselectElement(table: RestaurantTable, event) {
    this.mouseDown = false;
    table.x = this.currentMatrix[4];
    table.y = this.currentMatrix[5];
  }


  onNext() {
    if (this.segments_div.nativeElement.classList.contains('active') && this.segments_a.nativeElement.classList.contains('active')) {
      if (this.numberOfSegments.length == 0) {
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


  selectNumberOfSegments(event) {
    this.numberOfSegments = [];
    for (var i = 0; i < event.srcElement.value; i++) {
      this.numberOfSegments.push(i);
    }
  }


  onSegmentsNameSubmit(form: NgForm) {
    let segs: string[] = [];
    for (var i = 0; i < this.numberOfSegments.length; i++) {
      segs.push(form.controls['segmentName' + i].value);
    }

    for (var i = 0; i < segs.length; i++) {
      for (var j = 0; j < segs.length; j++) {
        if (i != j) {
          if (segs[i] == segs[j]) {
            sweetAlert("Ouups!", "Segment must have unique name.", "error");
            return;
          }
        }
      }
    }

    this.restaurantSegments = [];

    for (var i = 0; i < this.numberOfSegments.length; i++) {
      let rs: RestaurantSegment = new RestaurantSegment();
      rs.name = form.controls['segmentName' + i].value;
      rs.restaurant = this.restaurant;
      let posx: number = 0;
      let posy: number = 0;
      for (var j = 0; j < form.controls['numberOfTables' + i].value; j++) {
        let rt: RestaurantTable = new RestaurantTable();

        if (j % 3 == 0 && j != 0) {
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


    if (this.segments_name_div.nativeElement.classList.contains('active') && this.segments_name_a.nativeElement.classList.contains('active')) {
      this.schedule_a.nativeElement.classList.add('active');
      this.segments_name_div.nativeElement.classList.remove('active');
      this.schedule_div.nativeElement.classList.add('active');
      this.segments_name_a.nativeElement.classList.remove('active');
      return;
    }

  }


  onNextToFinish() {
    if (this.schedule_a.nativeElement.classList.contains('active') && this.schedule_div.nativeElement.classList.contains('active')) {
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

  onSubmitAddEmployee(emp: Employee, repeatPassword: string) {
    if (emp.password != repeatPassword) {
      this.errMessage = true;
      this.repeatPass.nativeElement.value = '';
      return;
    } else {
      this.errMessage = false;
    }

    emp.restaurant = this.restaurant;
    this.freeWorkers.push(emp);
    this.restaurantService.addEmployee(emp).subscribe(
      () => {
        swal("Good job!", "You added a new employee!", "success");
        var dirtyFormID = 'modifyEmpForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
      }
    );
  }

  checkEmployeeUsername(username: string) {
    this.restaurantService.checkEmployeeUsername(username).subscribe(
      data => {
        if (data['_body'] == 'true') {
          this.errUsernameMessage = true;
          this.username.nativeElement.value = ''
        } else {
          this.errUsernameMessage = false;
        }
      }
    );
  }

  dateChange(event) {
    this.selectedDate = event.srcElement.value.toString();
    let desc = this.restaurant.description;
    if (event.srcElement.value.toString() == '') {
      this.schedulesFirst = [];
      this.schedulesSecond = [];
      return;
    }
    this.restaurant.description = event.srcElement.value.toString();
    this.restaurantService.getSchedules(this.restaurant).subscribe(
      data => {
        this.restaurant.description = desc;
        let schedules: Schedule[] = JSON.parse(data['_body']);
        this.schedulesSecond = [];
        this.schedulesFirst = [];
        for (var i = 0; i < schedules.length; i++) {
          if (schedules[i].shift == 'FIRST')
            this.schedulesFirst.push(schedules[i]);
          else
            this.schedulesSecond.push(schedules[i]);
        }
        this.freeWorkers = [];
        for (var i = 0; i < this.workers.length; i++) {
          let flag = true;
          for (var j = 0; j < schedules.length; j++) {
            if (this.workers[i].id == schedules[j].employee.id) {
              flag = false;
              break;
            }
          }
          if (flag)
            this.freeWorkers.push(this.workers[i]);
        }
      }
    );
  }

  onCloseAddEmployeeSchedule() {
    this.addEmployeeSchedule = false;
  }

  onAddEmployeeSchedule(firstShift: boolean) {
    if (this.freeWorkers.length == 0) {
      swal("Error!", "All workers are already scheduled for today!", "error")
    } else
      this.addEmployeeSchedule = true;

    this.selectedShift = firstShift;
  }

  onRemoveEmployeeSchedule(emp: Employee) {
    let s = new Schedule();
    let desc = this.restaurant.description;
    let d = this.restaurant;
    if (isNullOrUndefined(this.selectedDate))
      this.restaurant.description = 'today';
    else
      this.restaurant.description = this.selectedDate.toString();
    s.restaurant = this.restaurant;
    s.employee = emp;
    let service = this.restaurantService;
    let fw = this.freeWorkers;
    let sf = this.schedulesFirst;
    let ss = this.schedulesSecond;
    if (s.employee.role == 'WAITER') {
      let flag = false;
      for (let i = 0; i < this.schedulesFirst.length; i++) {
        if (this.schedulesFirst[i].restaurant.id == s.restaurant.id && this.schedulesFirst[i].employee.id == s.employee.id) {
          s.segments = this.schedulesFirst[i].segments;
          flag = true;
          break;
        }
      }
      if (!flag) {
        for (let i = 0; i < this.schedulesSecond.length; i++) {
          if (this.schedulesSecond[i].restaurant.id == s.restaurant.id && this.schedulesSecond[i].employee.id == s.employee.id) {
            s.segments = this.schedulesSecond[i].segments;
            flag = true;
            break;
          }
        }
      }
    }
    swal({
        title: "Delete employee shift",
        text: "Are you shure you wan't to delete this employee's shift?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function () {
        service.removeSchedule(s).subscribe(
          () => {
            swal("Deleted!", "The worker is free today.", "success");
            d.description = desc;
            fw.push(emp);
            for (let i = 0; i < sf.length; i++) {
              console.log(sf[i]);
              if (sf[i].employee.id == emp.id) {
                sf.splice(i, 1);
                return;
              }
            }
            for (let i = 0; i < ss.length; i++) {
              if (ss[i].employee.id == emp.id) {
                ss.splice(i, 1);
                return;
              }
            }
          }
        );
      });
  }

  assignMenuItemForChange(mi: MenuItem) {
    this.changeNameExists = false;
    this.menuItemForChange = mi;
  }

  onSubmitChangeMenuItem(form: NgForm) {
    let mi: MenuItem = new MenuItem();
    mi.name = form.controls['namec'].value;
    mi.price = form.controls['pricec'].value;
    mi.description = form.controls['descriptionc'].value;
    mi.id = this.menuItemForChange.id;
    mi.menuItemType = this.menuItemForChange.menuItemType;
    mi.restaurant = this.menuItemForChange.restaurant;

    this.restaurantService.changeMenuItem(mi).subscribe(
      (data) => {
        if (data['_body'] == 'true') {
          document.getElementById('closeMenuItemChangeModal').click();
          this.menuItemForChange.name = form.controls['namec'].value;
          this.menuItemForChange.price = form.controls['pricec'].value;
          this.menuItemForChange.description = form.controls['descriptionc'].value;
        } else {
          this.changeNameExists = true;
        }
      });
  }

  onSaveEmployeeSchedule(form: NgForm) {
    let newS = new Schedule();
    newS.employee = this.freeWorkers[form.controls['selectedWorker'].value];

    if (newS.employee.role == 'WAITER') {
      this.addSegmentsBool = true;
      this.addEmployeeSchedule = false;
      this.selectedEmp = newS.employee;
      return;
    }

    if (this.selectedShift)
      newS.shift = 'FIRST';
    else
      newS.shift = 'SECOND';
    newS.restaurant = this.restaurant;
    let desc = this.restaurant.description;
    if (isNullOrUndefined(this.selectedDate))
      newS.restaurant.description = 'today';
    else
      newS.restaurant.description = this.selectedDate.toString();
    this.restaurantService.addSchedule(newS).subscribe(
      () => {
        this.onCloseAddEmployeeSchedule();

        if (this.selectedShift)
          this.schedulesFirst.push(newS);
        else
          this.schedulesSecond.push(newS);
        this.freeWorkers.splice(form.controls['selectedWorker'].value, 1);
        this.restaurant.description = desc;
      }
    );
  }

  deleteMenuItem(menuItem: MenuItem) {

    let restaurantService: RestaurantService = this.restaurantService;
    let menuItems: MenuItem[] = this.menuItems;
    let foodMenu: MenuItem[] = this.foodMenu;
    let drinkMenu: MenuItem[] = this.drinkMenu;
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this item!",
        type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!", closeOnConfirm: false
      },
      function () {

        restaurantService.deleteMenuItem(menuItem).subscribe(
          () => {
            if (menuItem.menuItemType == 'DRINK') {
              var index = drinkMenu.indexOf(menuItem, 0);
              if (index > -1) {
                drinkMenu.splice(index, 1);
              }
            } else {
              var index = foodMenu.indexOf(menuItem, 0);
              if (index > -1) {
                foodMenu.splice(index, 1);
              }
            }
            var index = menuItems.indexOf(menuItem, 0);
            if (index > -1) {
              menuItems.splice(index, 1);
            }
          }
        );
        swal("Deleted!", "Your item has been deleted.", "success");
      });
  }


  assignSegmentForChange(seg: RestaurantSegment) {
    this.segNameExists = false;
    this.segmentForChange = JSON.parse(JSON.stringify(seg));
  }

  onNumberOfTableChange(event) {
    if (event.srcElement.value < this.segmentForChange.tables.length) {
      this.segmentForChange.tables.splice(event.srcElement.value);
    } else {
      let rt: RestaurantTable = new RestaurantTable();
      rt.x = 10;
      rt.y = 90;
      this.segmentForChange.tables.push(rt);
    }
  }


  onSubmitSegmentChange(form: NgForm) {
    this.segmentForChange.name = form.controls['segName'].value;
    this.restaurantService.changeRestaurantSegment(this.segmentForChange).subscribe(
      (data) => {
        if (data['_body'] == 'true') {
          this.onSegmentsClick();
          document.getElementById('closeSegmentChangeModal').click();
        } else {
          this.segNameExists = true;
        }
      }
    );
  }

  onStarOneOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.removeProperty('color');
    document.getElementById("starThree").style.removeProperty('color');
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarTwoOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.removeProperty('color');
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarThreeOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.color = "#4ae3f8";
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarFourOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.color = "#4ae3f8";
    document.getElementById("starFour").style.color = "#465ef8";
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarFiveOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.color = "#4ae3f8";
    document.getElementById("starFour").style.color = "#465ef8";
    document.getElementById("starFive").style.color = "#3da71a";
  }

  onStarMouseLeave() {
    document.getElementById("starOne").style.removeProperty('color');
    document.getElementById("starTwo").style.removeProperty('color');
    document.getElementById("starThree").style.removeProperty('color');
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarRate(rating: number) {
    let ug: UserGrade = new UserGrade();
    ug.restaurant = this.restaurant;
    ug.grade = rating;
    this.restaurantService.rateRestaurant(ug).subscribe(
      (data) => {
        if (data['_body'] == -1) {
          sweetAlert("Sorry...", "You already rated this restaurant!", "error");
        } else {
          swal("Thank you!", "You rated restaurant " + this.restaurant.name + "!", "success");
          this.restaurant.grade = data['_body'];
        }
      }
    );
  }


  onAddSegments(form: NgForm) {
    let send: RestaurantSegment[] = [];
    for (let i = 0; i < this.thisSegments.length; i++) {
      if (form.controls[this.thisSegments[i].id.toString()].value == true) {
        send.push(this.thisSegments[i]);
      }
    }
    if (send.length == 0) {
      swal("Error!", "You must select at least one segment.", "error")
    } else {
      let newS = new Schedule();
      if (this.selectedShift)
        newS.shift = 'FIRST';
      else
        newS.shift = 'SECOND';
      newS.employee = this.selectedEmp;
      newS.restaurant = this.restaurant;
      let desc = this.restaurant.description;
      newS.restaurant.description = this.selectedDate;
      newS.segments = send;
      this.restaurantService.addSchedule(newS).subscribe(
        () => {
          this.restaurant.description = desc;
          this.addSegmentsBool = false;

          if (this.selectedShift)
            this.schedulesFirst.push(newS);
          else
            this.schedulesSecond.push(newS);
          this.freeWorkers.splice(this.freeWorkers.indexOf(this.selectedEmp), 1);
        }
      );
    }
  }

  getSegmentsString(s: Schedule) {
    let ret = '';
    for (let i = 0; i < s.segments.length; i++) {
      ret += s.segments[i].name + ' ';
    }

    return ret;
  }

}
