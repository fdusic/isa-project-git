import {Restaurant} from "./app.restaurant";
import {RestaurantTable} from "./restaurant-table";

export class RestaurantSegment{
  public id:number;
  public name:string;
  public restaurant:Restaurant;
  public tables:RestaurantTable[]=[];
}
