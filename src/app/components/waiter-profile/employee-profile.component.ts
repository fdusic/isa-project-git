import {Component, OnInit, OnDestroy} from '@angular/core';
import {Employee} from "../../beans/employee";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {Order} from "../../beans/order";
import {RoleService} from "../../services/role.service";
import {MenuItem} from "../../beans/menu-item";
import {Subscription, Observable} from "rxjs";
import {Schedule} from "../../beans/schedule";
declare let swal: any;

@Component({
  selector: 'app-waiter-profile',
  templateUrl: 'employee-profile.component.html',
  styleUrls: ['employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {

  private employee: Employee;
  private orders: Order[] = [];

  private moreOnOrderDialog = false;
  private orderForShow: Order;

  private foodForShow: MenuItem[] = [];
  private drinksForShow: MenuItem[] = [];

  private sub : Subscription;

  private calendar = false;
  private ordersTab = true;

  private schedules: Schedule[] = [];
  private todaySchedule: Schedule;
  private todayDate: Date;
  constructor(private employeeService: EmployeeService, private router: Router, private roleService: RoleService) {
    let timer = Observable.timer(2000,10000);

    this.employeeService.getEmployee().subscribe(
      (data) => {
        this.employee= JSON.parse(data["_body"]);
    });
    if(this.roleService.waiter){
      this.sub = timer.subscribe(() => {
        this.employeeService.getWaiterOrders().subscribe(
          (data) => {
            this.orders = JSON.parse(data['_body']);
          }
        );
      });
    }if(this.roleService.chef){
      this.sub = timer.subscribe(() => {
        this.employeeService.getChefOrders().subscribe(
          (data) => {
            this.orders = JSON.parse(data['_body']);
          }
        );
      });
    }
    if(this.roleService.bartender){
      this.sub = timer.subscribe(() => {
        this.employeeService.getBartenderOrders().subscribe(
          (data) => {
            this.orders = JSON.parse(data['_body']);
          }
        );
      });
    }
    this.employeeService.getEmployeeSchedules().subscribe(
      (data) => {
        this.schedules = JSON.parse(data["_body"]);
        if(this.roleService.waiter) {
          for (var i = 0; i < this.schedules.length; i++) {
            this.todayDate = new Date();
            let month = this.todayDate.getMonth() + 1;
            let day = this.todayDate.getDate();
            let year = this.todayDate.getFullYear();
            if(month == (+this.getMonth(this.schedules[i])) && year == (+this.getYear(this.schedules[i])) && day == (+this.getDay(this.schedules[i]))){
              this.todaySchedule = this.schedules[i];
              console.log(this.todaySchedule.segments[0].name);
              console.log(this.todaySchedule.segments[0].tables.length);
              break;
            }
          }
        }
      }
    )
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
  getShift(sch: Schedule){
    if(sch.shift == "FIRST"){
      return "07:00 - 15:00";
    }else{
      return "15:00 - 23:00";
    }
  }

  activateOrders(){
    this.calendar = false;
    this.ordersTab = true;
  }

  activateCalendar(){
    this.calendar = true;
    this.ordersTab = false;
  }
  ngOnDestroy(){
    if(this.roleService.user){
      this.sub.unsubscribe();
    }
  }

  canWaiterFinish(order: Order){
    let ret = false;
    if(this.roleService.waiter){
      if(order.bartender && order.chef){
        if(order.bartenderFinished && order.chefFinished){
          return true;
        }
      }else if(order.bartender && order.bartenderFinished){
        return true;
      }else if(order.chef && order.chefFinished){
        return true;
      }
    }
    return false;
  }
  canWaiterChange(order: Order){
    if(this.roleService.waiter){
      if(order.bartender && order.chef){
        if(!order.chefAccepted && !order.bartenderFinished){
          return true;
        }
      }else if(order.bartender){
        if(!order.bartenderFinished){
          return true;
        }
      }else if(order.chef) {
        if(!order.chefAccepted) {
          return true;
        }
      }
    }

    return false;
  }

  waiterFinishOrder(order: Order){
    this.employeeService.waiterFinishOrder(order).subscribe(
      (data) => {
        for(var i = 0;i<this.orders.length;i++){
          if(this.orders[i].id == order.id){
            this.orders.splice(i,1);
            break;
          }
        }
        swal({title : "Success!", text : "Order's been finished.", type : "success"});
      });
  }

  bartenderFinishOrder(order: Order){
    this.employeeService.bartenderFinishOrder(order).subscribe(
      (data) => {
        for(var i = 0;i<this.orders.length;i++){
          if(this.orders[i].id == order.id){
            this.orders.splice(i,1);
            break;
          }
        }
        swal({title : "Success!", text : "Order's been finished.", type : "success"});
      });
  }

  chefFinishOrder(order: Order){
    this.employeeService.chefFinishOrder(order).subscribe(
      (data) => {
        for(var i = 0;i<this.orders.length;i++){
          if(this.orders[i].id == order.id){
            this.orders.splice(i,1);
            break;
          }
        }
        swal({title : "Success!", text : "Order's been finished.", type : "success"});
      });
  }
  chefAcceptOrder(order: Order){
    this.employeeService.chefAcceptOrder(order).subscribe(
      (data) => {
        for(var i = 0;i<this.orders.length;i++){
          if(this.orders[i].id == order.id){
            this.orders[i] = JSON.parse(data['_body']);
            break;
          }
        }
        swal({title : "Success!", text : "Order's been accepted.", type : "success"});
      }
    )
  }

  changeOrder(order: Order){
    this.employeeService.orderForChange = order;
    this.router.navigateByUrl('/home/change-order')
  }

  isBartenderFinished(order){
    if(order.bartenderFinished){
      return "Bartender finished.";
    }
    return "Waiting bartender.";
  }

  isChefAccepted(order){
    if(order.chefAccepted){
      return "Chef accepted.";
    }
    return "Waiting chef.";
  }

  isChefFinished(order){
    if(order.chefFinished){
      return "Chef finished.";
    }
    return "Waiting chef.";
  }


  showOrderDetails(order: Order){
    this.orderForShow = order;
    this.foodForShow = [];
    this.drinksForShow = [];
    for(var i = 0;i<order.menuItems.length; i++){
      if(order.menuItems[i].menuItemType == "FOOD"){
        this.foodForShow.push(order.menuItems[i]);
      }else{
        this.drinksForShow.push(order.menuItems[i]);
      }
    }
    this.moreOnOrderDialog = true;
  }

  hideMoreOnOrderDialog(){
    this.moreOnOrderDialog = false;
  }

  getWaiterGrade(){
    if(this.employee != null) {
      if (this.employee.waiterGrade == 0) {
        return "Not rated";
      } else {
        return this.employee.waiterGrade.toString();
      }
    }
  }

  addOrder(){
    this.router.navigateByUrl('/home/add-order');
  }

  hasBartender(order: Order){
    if(order.bartender != null){
      return true;
    }
    return false;
  }

  hasChef(order: Order){
    if(order.chef != null){
      return true;
    }
    return false;
  }

  ngOnInit() {
  }

}
