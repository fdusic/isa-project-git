import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Supplier} from "../beans/supplier";
import {PurchaseSupplier} from "../beans/purchase-supplier";

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

  removePurchaseSupplier(ps : PurchaseSupplier){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'removePurchaseSupplier', JSON.stringify(ps), { withCredentials : true, headers : h });
  }

  modifyPurchaseSupplier(ps : PurchaseSupplier){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'modifyPurchaseSupplier', JSON.stringify(ps), { withCredentials : true, headers : h });
  }

  getPurchases(){
    return this.http.get(this.path + 'getPurchases', { withCredentials : true });
  }

  addPurchaseSupplier(ps : PurchaseSupplier){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addPurchaseSupplier', JSON.stringify(ps), { withCredentials : true, headers : h });
  }

  changePassword(pass : string){
    return this.http.post(this.path + 'changePassword', pass, { withCredentials : true});
  }

}
