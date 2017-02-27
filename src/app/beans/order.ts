import {Employee} from "./employee";
import {MenuItem} from "./menu-item";
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

}
