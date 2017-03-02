import {TableVersions} from "./table-versions";
export class RestaurantTable{
  public id:number;
  public startX:number;
  public startY:number;
  public x:number;
  public y:number;
  public tableVersions: TableVersions[]=[];


  constructor(){}

}
