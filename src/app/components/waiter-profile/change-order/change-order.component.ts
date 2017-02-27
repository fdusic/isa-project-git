import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../../beans/order";
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../beans/employee";
import {MenuItem} from "../../../beans/menu-item";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
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

  @ViewChild('bart') bart: any;
  @ViewChild('ch') ch: any;

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.order = this.employeeService.orderForChange;
    this.employeeService.getBartenders().subscribe(
      (data) => {
        this.bartenders = JSON.parse(data['_body']);
      }
    );
    this.employeeService.getChefs().subscribe(
      (data) => {
        this.chefs = JSON.parse(data['_body']);
      }
    );
    this.employeeService.getMenuItems().subscribe(
      (data) => {
        this.menuItems = JSON.parse(data['_body']);
        for (var i = 0; i < this.order.menuItems.length; i++) {
          if (this.order.menuItems[i].menuItemType == "FOOD") {
            this.addedFoodItems.push(this.order.menuItems[i]);
          }
          else {
            this.addedDrinkItems.push(this.order.menuItems[i]);
          }
          this.deleteMenuItem(this.order.menuItems[i]);
        }
      }
    );
    if(this.employeeService.orderForChange.bartender != null)
      this.bartender = this.employeeService.orderForChange.bartender.username ;
    if(this.employeeService.orderForChange.chef != null)
      this.chef = this.employeeService.orderForChange.chef.username;
  }

  onChangeOrder(){
    let order = new Order();
    order.id = this.employeeService.orderForChange.id;
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
    let router = this.router;
    this.employeeService.changeOrder(order).subscribe(
      (data) => {
        swal({title : "Success!", text : "Order's been changed.", type : "success"}, function(){
          router.navigateByUrl('/home/employee-profile');
        });
      }
    )
  }

  onRemove(menuItem: MenuItem){
    if(menuItem.menuItemType == "FOOD"){
      this.addedFoodItems.splice(this.addedFoodItems.indexOf(menuItem), 1);
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
}
