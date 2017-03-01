import {Employee} from "./employee";
import {MenuItem} from "./menu-item";
import {RestaurantTable} from "./restaurant-table";
export class Order{

  public id: number;
  public waiter: Employee;
  public bartender: Employee;
  public chef: Employee;
  public menuItems: MenuItem[] = [];
  public finished: boolean;
  public chefAccepted: boolean;
  public chefFinished: boolean;
  public bartenderFinished: boolean;
  public date: Date;
  public restaurantTable: RestaurantTable;
  public version: number;
}
