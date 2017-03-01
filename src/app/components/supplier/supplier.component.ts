import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../services/supplier.service";
import {Supplier} from "../../beans/supplier";
import {PurchaseSupplier} from "../../beans/purchase-supplier";
import {Purchase} from "../../beans/purchase";
import {isNullOrUndefined} from "util";
declare let swal : any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  private supplier : Supplier = new Supplier();
  private purchaseSupplierDone : PurchaseSupplier[] = [];
  private purchaseSupplierPending : PurchaseSupplier[] = [];
  private purchases : Purchase[] = [];

  constructor(private httpService : SupplierService) { }

  ngOnInit() {
    this.httpService.getSupplier().subscribe(
      data => {
        this.supplier = JSON.parse(data['_body']);
      }
    );
    this.httpService.getPurchaseSupplier().subscribe(
      data => {
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
    this.httpService.getPurchases().subscribe(
      data => {
        this.purchases = JSON.parse(data['_body']);
      }
    );
  }

  removePS(ps : PurchaseSupplier){
    let service = this.httpService;
    let psp = this.purchaseSupplierPending;
    let pur = this.purchases;
    swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function(){
        service.removePurchaseSupplier(ps).subscribe(
          (data) => {
            if(data['_body'] == 'true') {
              swal("Deleted!", "Your offer has been removed.", "success");
              psp.splice(psp.indexOf(ps), 1);
              pur.push(ps.purchase);
            } else{
              swal({title :"Error",text : "It seems that the manager has accepted or declined your offer. The page will restart.", type : "error"},
                function(){
                  location.reload();
                } );
            }
          }
        );
      });
  }

  modifySupplier(ps : PurchaseSupplier){
    let service = this.httpService;
    swal({
      title: "Change price",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      inputPlaceholder: "New price"
    }, function (inputValue) {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false
      }
      console.log(parseFloat(inputValue));
      if(isNaN(parseFloat(inputValue))){
        swal.showInputError("Invalid number!");
        return false;
      }else {
        ps.price = inputValue;
        service.modifyPurchaseSupplier(ps).subscribe(
          (data) => {
            if(data['_body'] == 'true'){
              swal("Success!", "You changed the price to: " + inputValue, "success");
            } else{
              swal({title : "Error", text : "It seems that the manager has accepted or declined your offer. The page will restart.", type : "error"},
                      function(){
                        location.reload();
                      });
            }

          }
        );
      }
    });
  }

  sendOffer(p : Purchase){
    let service = this.httpService;
    let s = this.supplier;
    let purchases = this.purchases;
    let psp = this.purchaseSupplierPending;
    swal({
      title: "Send offer",
      text: "Enter your price for the order:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      inputPlaceholder: "Price"
    }, function (inputValue) {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false;
      }
      if(isNaN(parseFloat(inputValue))){
        swal.showInputError("Invalid number!");
        return false;
      } else{
        let ps = new PurchaseSupplier();
        ps.purchase = p;
        ps.supplier = s;
        ps.status = 'PENDING';
        ps.price = inputValue;
        service.addPurchaseSupplier(ps).subscribe(
          () => {
            purchases.splice(purchases.indexOf(p),1);
            ps.version = 0;
            psp.push(ps);
            swal("Success!", "Your offer of " + inputValue + ' has been sent', "success");
          }
        );
      }
    });
  }

}
