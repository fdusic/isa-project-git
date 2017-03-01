import {Component, OnInit, ViewChild} from '@angular/core';
import {Manager} from "../../../beans/manager";
import {Employee} from "../../../beans/employee";
import {EmployeeService} from "../../../services/employee.service";
import {MenuItem} from "../../../beans/menu-item";
import {NgForm} from "@angular/forms";
import {Order} from "../../../beans/order";
import {Router} from "@angular/router";
import {Schedule} from "../../../beans/schedule";
import {RestaurantTable} from "../../../beans/restaurant-table";
declare let swal: any;

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  private bartenders:Employee[] = [];
  private chefs: Employee[] = [];
  private menuItems: MenuItem[] = [];

  private addedFoodItems: MenuItem[] = [];
  private addedDrinkItems: MenuItem[] = [];

  private addMenuItemDialog = false;
  private bartenderChangedBoolean = false;
  private chefChangedBoolean = false;

  private bartender = "";
  private chef = "";


  private schedules: Schedule[] = [];
  private todayDate: Date;

  private bartendersForShow:Employee[] = [];
  private chefsForShow: Employee[] = [];

  private todaySchedule: Schedule;
  //private schedules: Schedule[];

  private restaurantTable: RestaurantTable;
  private tableSelected = false;

  private tables: RestaurantTable[] = [];

  @ViewChild('bart') bart: any;
  @ViewChild('ch') ch: any;
  @ViewChild('tab') tab: any;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
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
  }

  onCloseAddMenuItem(){
    this.addMenuItemDialog = false;
  }

  addMenuItem(){
    this.addMenuItemDialog = true;
  }

  onAddMenuItemForOrder(form: NgForm){
    let item = form.controls['menuItem'].value;
    let strings: string[] = item.split("(");
    let itemId = strings[1].split(")")[0];
    this.redefineMenuItems(itemId);
    this.addMenuItemDialog = false;
  }


  redefineMenuItems(itemId: string){
    let k: number;
    let menuItem : MenuItem;
    for(var i = 0; i < this.menuItems.length; i++){
      if(this.menuItems[i].id == (+itemId)){
        k = i;
        menuItem = this.menuItems[i];
        break;
      }
    }
    this.menuItems.splice(this.menuItems.indexOf(menuItem), 1);

    if(menuItem.menuItemType == "FOOD") {
      this.addedFoodItems.push(menuItem);
    }else{
      this.addedDrinkItems.push(menuItem);
    }
  }

  onAddOrder(){
    let order = new Order();

    if(this.addedFoodItems.length > 0){
      for(var i = 0;i < this.addedFoodItems.length; i++){
        order.menuItems.push(this.addedFoodItems[i]);
      }
      for(var i = 0; i < this.chefs.length; i++){
        if(this.chefs[i].username == this.chef){
          order.chef = this.chefs[i];
          break;
        }
      }
    }
    if(this.addedDrinkItems.length > 0){
      for(var i = 0;i < this.addedDrinkItems.length; i++){
        order.menuItems.push(this.addedDrinkItems[i]);
      }
      for(var i = 0;i < this.bartenders.length; i++){
        if(this.bartenders[i].username == this.bartender){
          order.bartender = this.bartenders[i];
        }
      }
    }
    order.restaurantTable = this.restaurantTable;
    let router = this.router;
    this.employeeService.addOrder(order).subscribe(
      (data) => {
        swal({title : "Success!", text : "Order's been added.", type : "success"}, function(){
          router.navigateByUrl('/home/employee-profile');
        });
      }
    )
  }


  isDisabled(){
    if(this.menuItems.length == 0)
      return true;
    return false;
  }

  bartenderChanged(event: any){
    this.bartenderChangedBoolean = true;
    let string: string[] = this.bart.nativeElement.value.split(" (");
    this.bartender = string[1].split(")")[0];
  }

  setTable(){
    let id = this.tab.nativeElement.value;
    for(var i = 0; i < this.tables.length; i++){
      if(this.tables[i].id == id){
        this.restaurantTable = this.tables[i];
        this.tableSelected = true;
        break;
      }
    }
  }

  chefChanged(){
    this.chefChangedBoolean = true;
    let string: string[] = this.ch.nativeElement.value.split(" (");
    this.chef = string[1].split(")")[0];
  }

  isAddOrderDisabled(){
    if(this.addedDrinkItems.length > 0 && this.addedFoodItems.length > 0 && this.chefChangedBoolean && this.bartenderChangedBoolean && this.tableSelected){
      return false;
    }else if(this.addedDrinkItems.length > 0 && this.bartenderChangedBoolean && this.addedFoodItems.length == 0 && this.tableSelected){
      return false;
    }else if(this.addedFoodItems.length > 0 && this.chefChangedBoolean && this.addedDrinkItems.length == 0 && this.tableSelected){
      return false;
    }
    return true;
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
