import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../../beans/order";
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../beans/employee";
import {MenuItem} from "../../../beans/menu-item";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Schedule} from "../../../beans/schedule";
import {RestaurantTable} from "../../../beans/restaurant-table";
declare let swal: any;
@Component({
  selector: 'app-change-order',
  templateUrl: './change-order.component.html',
  styleUrls: ['./change-order.component.css']
})
export class ChangeOrderComponent implements OnInit {

  private order: Order;
  private bartenders: Employee[] = [];
  private chefs: Employee[] = [];
  private menuItems: MenuItem[] = [];


  private addedFoodItems: MenuItem[] = [];
  private addedDrinkItems: MenuItem[] = [];

  private addMenuItemDialog = false;
  private bartenderChangedBoolean = false;
  private chefChangedBoolean = false;

  private bartender = "";
  private chef = "";

  private bartendersForShow:Employee[] = [];
  private chefsForShow: Employee[] = [];
  private todaySchedule: Schedule;

  private schedules: Schedule[] = [];
  private todayDate: Date;
  private restaurantTable: RestaurantTable;
  private tables: RestaurantTable[] = [];

  private changedFood = false;

  @ViewChild('bart') bart: any;
  @ViewChild('ch') ch: any;
  @ViewChild('tab') tab: any;

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.order = this.employeeService.orderForChange;
    this.employeeService.getBartenders().subscribe(
      (data) => {
        this.bartenders = JSON.parse(data['_body']);
        for(var i = 0;i < this.bartenders.length;i++){
          this.employeeService.getScheduleForEmp(this.bartenders[i]).subscribe(
            (data) => {
              this.schedules = [];
              this.schedules = JSON.parse(data['_body']);
              for (var j = 0; j < this.schedules.length; j++) {
                this.todayDate = new Date();
                let month = this.todayDate.getMonth() + 1;
                let day = this.todayDate.getDate();
                let year = this.todayDate.getFullYear();
                let hours = this.todayDate.getHours();
                if(month == (+this.getMonth(this.schedules[j])) && year == (+this.getYear(this.schedules[j])) && day == (+this.getDay(this.schedules[j])) ){
                  if(this.schedules[j].shift == "FIRST"){
                    if(hours < 15) {
                      this.bartendersForShow.push(this.schedules[j].employee);
                      break;
                    }
                  }else{
                    if(hours > 15){
                      this.bartendersForShow.push(this.schedules[j].employee);
                      break;
                    }
                  }
                  break;
                }
              }
            }
          );
        }
      }
    );
    this.employeeService.getChefs().subscribe(
      (data) => {
        this.chefs = JSON.parse(data['_body']);
        for(var i = 0;i < this.chefs.length;i++){
          this.employeeService.getScheduleForEmp(this.chefs[i]).subscribe(
            (data) => {
              this.schedules = JSON.parse(data['_body']);
              for (var j = 0; j < this.schedules.length; j++) {
                this.todayDate = new Date();
                let month = this.todayDate.getMonth() + 1;
                let day = this.todayDate.getDate();
                let year = this.todayDate.getFullYear();
                let hours = this.todayDate.getHours();
                if(month == (+this.getMonth(this.schedules[j])) && year == (+this.getYear(this.schedules[j])) && day == (+this.getDay(this.schedules[j])) ){
                  if(this.schedules[j].shift == "FIRST"){
                    if(hours < 15) {
                      this.chefsForShow.push(this.schedules[j].employee);
                    }
                  }else{
                    if(hours > 15){
                      this.chefsForShow.push(this.schedules[j].employee);
                    }
                  }
                  break;
                }
              }
            }
          );
        }
      }
    );
    this.employeeService.getMenuItems().subscribe(
      (data) => {
        this.menuItems = JSON.parse(data['_body']);
        for (var i = 0; i < this.order.menuItems.length; i++) {
          if (this.order.menuItems[i].menuItemType == "FOOD" && !this.employeeService.orderForChange.chefFinished) {
            this.addedFoodItems.push(this.order.menuItems[i]);
          }
          else if(!this.employeeService.orderForChange.bartenderFinished){

            this.addedDrinkItems.push(this.order.menuItems[i] );
          }
          this.deleteMenuItem(this.order.menuItems[i]);
        }
      }
    );
    this.employeeService.getEmployee().subscribe(
      (data) => {
        let emp: Employee = JSON.parse(data['_body']);
        this.employeeService.getScheduleForEmp(emp).subscribe(
          (data) => {
            this.schedules = JSON.parse(data['_body']);
            for (var i = 0; i < this.schedules.length; i++) {
              this.todayDate = new Date();
              let month = this.todayDate.getMonth() + 1;
              let day = this.todayDate.getDate();
              let year = this.todayDate.getFullYear();
              if(month == (+this.getMonth(this.schedules[i])) && year == (+this.getYear(this.schedules[i])) && day == (+this.getDay(this.schedules[i]))){
                this.todaySchedule = this.schedules[i];
                for(var i = 0;i < this.todaySchedule.segments.length;i++){
                  for(var j = 0; j < this.todaySchedule.segments[i].tables.length;j++){
                    this.tables.push(this.todaySchedule.segments[i].tables[j]);
                  }
                }
                break;
              }
            }
          }
        );
      }
    );


    if(this.employeeService.orderForChange.bartender != null) {
      this.bartender = this.employeeService.orderForChange.bartender.username;
    }
    if(this.employeeService.orderForChange.chef != null)
      this.chef = this.employeeService.orderForChange.chef.username;


      this.restaurantTable = this.employeeService.orderForChange.restaurantTable;
      console.log(this.restaurantTable);
      console.log(this.chef);
  }

  onChangeOrder(){
    let order = new Order();
    order.version = this.employeeService.orderForChange.version;
    order.id = this.employeeService.orderForChange.id;
    order.date = this.employeeService.orderForChange.date;
    order.bartenderFinished = this.employeeService.orderForChange.bartenderFinished;
    if(!this.changedFood)
      order.chefAccepted = this.employeeService.orderForChange.chefAccepted;
    else
      order.chefAccepted = false;
    order.chefFinished = this.employeeService.orderForChange.chefFinished;
    if(this.addedFoodItems.length > 0){
      for(var i = 0;i < this.addedFoodItems.length; i++){
        order.menuItems.push(this.addedFoodItems[i]);
      }
      if(!this.employeeService.orderForChange.chefAccepted) {
        for (var i = 0; i < this.chefs.length; i++) {
          if (this.chefs[i].username == this.chef) {
            order.chef = this.chefs[i];
            break;
          }
        }
      }else{
        order.chef = this.employeeService.orderForChange.chef;
      }
    }

    if(this.addedDrinkItems.length > 0){
      for(var i = 0;i < this.addedDrinkItems.length; i++){
        order.menuItems.push(this.addedDrinkItems[i]);
      }
      if(!this.employeeService.orderForChange.bartenderFinished) {
        for (var i = 0; i < this.bartenders.length; i++) {
          if (this.bartenders[i].username == this.bartender) {
            order.bartender = this.bartenders[i];
          }
        }
      }else{
        order.bartender = this.employeeService.orderForChange.bartender;
      }
    }
    console.log(order.chef);
    console.log(order.bartender);
    order.restaurantTable = this.restaurantTable;
    let router = this.router;
    this.employeeService.changeOrder(order).subscribe(
      (data) => {
        if(data['_body'] == "true") {
          swal({title: "Success!", text: "Order's been changed.", type: "success"}, function () {
            router.navigateByUrl('/home/employee-profile');
          });
        }else{
          swal({title: "Error!", text: "Order's been modified, check order's details and try again.", type: "error"}, function () {
            router.navigateByUrl('/home/employee-profile');
          });
        }
      }
    )
  }

  setTable(){
    let id = this.tab.nativeElement.value;
    for(var i = 0; i < this.tables.length; i++){
      if(this.tables[i].id == id){
        this.restaurantTable = this.tables[i];
        break;
      }
    }
  }

  onRemove(menuItem: MenuItem){
    if(menuItem.menuItemType == "FOOD"){
      this.addedFoodItems.splice(this.addedFoodItems.indexOf(menuItem), 1);
      this.changedFood = true;
    }else{
      this.addedDrinkItems.splice(this.addedDrinkItems.indexOf(menuItem), 1);
    }
    this.menuItems.push(menuItem);
  }

  deleteMenuItem(mi: MenuItem){
    let k;
    for(var i = 0;i<this.menuItems.length;i++){
      if(this.menuItems[i].id == mi.id){
        k = i;
      }
    }
    this.menuItems.splice(k, 1);
  }

  addMenuItem() {
    this.addMenuItemDialog = true;
  }

  onAddMenuItemForOrder(form: NgForm) {
    let item = form.controls['menuItem'].value;
    let strings: string[] = item.split("(");
    let itemId = strings[1].split(")")[0];
    this.redefineMenuItems(itemId);
    this.addMenuItemDialog = false;
  }

  redefineMenuItems(itemId: string) {
    let k: number;
    let menuItem: MenuItem;
    for (var i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i].id == (+itemId)) {
        k = i;
        menuItem = this.menuItems[i];
        break;
      }
    }
    this.menuItems.splice(this.menuItems.indexOf(menuItem), 1);

    if (menuItem.menuItemType == "FOOD") {
      this.addedFoodItems.push(menuItem);
      this.changedFood = true;
    } else {
      this.addedDrinkItems.push(menuItem);
    }
  }

  isDisabled() {
    if (this.menuItems.length == 0)
      return true;
    return false;
  }

  bartenderChanged(event: any) {
    this.bartenderChangedBoolean = true;
    let string: string[] = this.bart.nativeElement.value.split(" (");
    this.bartender = string[1].split(")")[0];
  }

  chefChanged() {
    this.chefChangedBoolean = true;
    let string: string[] = this.ch.nativeElement.value.split(" (");
    this.chef = string[1].split(")")[0];
  }

  isAddOrderDisabled(){
  /*  if(this.addedDrinkItems.length > 0 && this.addedFoodItems.length > 0 && this.chefChangedBoolean && this.bartenderChangedBoolean){
      return false;
    }else if(this.addedDrinkItems.length > 0 && this.bartenderChangedBoolean && this.addedFoodItems.length == 0 ){
      return false;
    }else if(this.addedFoodItems.length > 0 && this.chefChangedBoolean && this.addedDrinkItems.length == 0){
      return false;
    }
    return true;*/
    if(this.addedDrinkItems.length > 0 || this.addedFoodItems.length > 0){
      return false;
    }
    return true;
  }


  onCloseAddMenuItem(){
    this.addMenuItemDialog = false;
  }

  getDay(sch: Schedule){
    let string = sch.date.toString().split("-");
    return string[2];
  }

  getMonth(sch: Schedule){
    let string = sch.date.toString().split("-");
    return string[1];
  }

  getYear(sch: Schedule){
    let string = sch.date.toString().split("-");
    return string[0];
  }

}
