import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../services/supplier.service";
import {Supplier} from "../../beans/supplier";
import {PurchaseSupplier} from "../../beans/purchase-supplier";
import {Purchase} from "../../beans/purchase";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  private supplier : Supplier = new Supplier();
  private purchaseSupplierDone : PurchaseSupplier[] = [];
  private purchaseSupplierPending : PurchaseSupplier[] = [];

  constructor(private httpService : SupplierService) { }

  ngOnInit() {
    this.httpService.getSupplier().subscribe(
      data => {
        this.supplier = JSON.parse(data['_body']);
      }
    );
    this.httpService.getPurchaseSupplier().subscribe(
      data => {
        console.log(data['_body']);
        let purchaseSupplier = JSON.parse(data['_body']);

        for(let i=0; i < purchaseSupplier.length; i++){
          if(purchaseSupplier[i].status == 'PENDING'){
            this.purchaseSupplierPending.push(purchaseSupplier[i]);
          } else{
            this.purchaseSupplierDone.push(purchaseSupplier[i]);
          }
        }

      }
    );
  }

}
