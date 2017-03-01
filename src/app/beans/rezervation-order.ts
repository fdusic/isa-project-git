import {User} from "./user";
import {MenuItem} from "./menu-item";
export class RezervationOrder{
  public id:number;
  public user:User;
  public menuItems:MenuItem[]=[];
  public finished:boolean;

  constructor(){

  }
}
