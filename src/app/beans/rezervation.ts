import {User} from "./user";
import {Restaurant} from "./app.restaurant";
import {RestaurantTable} from "./restaurant-table";
import {RezervationOrder} from "./rezervation-order";
import {RezervationInvite} from "./rezervation-invite";
export class Rezervation{
  public id:number;
  public user:User;
  public restaurant:Restaurant;
  public tables:RestaurantTable[];
  public rezervationOrders:RezervationOrder[]=[];
  public date:string;
  public time:string;
  public duration:string;
  public rezervationInvites:RezervationInvite[]=[];

  constructor(){}
}
