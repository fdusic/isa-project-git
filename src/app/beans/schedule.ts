import {Restaurant} from "./restaurant";
import {Employee} from "./employee";
import {RestaurantSegment} from "./restaurant-segment";
export class Schedule{

  public date : Date;
  public restaurant : Restaurant;
  public employee : Employee;
  public shift : string;
  public segments : RestaurantSegment[] = [];

  constructor(){
  }

}
