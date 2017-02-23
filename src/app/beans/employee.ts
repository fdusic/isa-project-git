import {AbstractEmployee} from "./abstract-employee";
import {Restaurant} from "./restaurant";
export class Employee extends AbstractEmployee {

  public confectionNum: number;
  public shoeSize: number;
  public waiterGrade: number;
  public role: string;
  public restaurant: Restaurant;

  constructor(){
    super();
  }
}
