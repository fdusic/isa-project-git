import {Restaurant} from "./app.restaurant";
export abstract class AbstractEmployee{

  public id:number;
  public restaurant:Restaurant;
  public username:string;
  public password:string;
  public name:string;
  public surname:string;
  public address:string;
}
