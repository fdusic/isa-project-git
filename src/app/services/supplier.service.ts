import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Supplier} from "../beans/supplier";

@Injectable()
export class SupplierService{

  private path:string = 'http://localhost:8080/restaurant/';

  constructor(private http : Http) { }

  getSupplier(){
    return this.http.get(this.path + 'getSupplier', { withCredentials : true });
  }

  modifySupplier(supplier : Supplier){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'modifySupplier', JSON.stringify(supplier) ,{ withCredentials : true, headers : h});
  }

  getPurchaseSupplier(){
    return this.http.get(this.path + 'getPurchaseSupplier', { withCredentials : true });
  }

}
