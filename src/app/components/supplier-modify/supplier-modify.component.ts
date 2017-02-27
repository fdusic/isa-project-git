import {Component, OnInit, ViewChild} from '@angular/core';
import {SupplierService} from "../../services/supplier.service";
import {Supplier} from "../../beans/supplier";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
declare let swal : any;

@Component({
  selector: 'app-supplier-modify',
  templateUrl: './supplier-modify.component.html',
  styleUrls: ['./supplier-modify.component.css']
})
export class SupplierModifyComponent implements OnInit {

  private supplier : Supplier = new Supplier();
  private passwordCorrect = true;

  @ViewChild('invalidPassword') invalidPassword: any;
  @ViewChild('newPassErr') newPassErr : any;

  constructor(private httpService : SupplierService, private router : Router) { }

  ngOnInit() {
    this.httpService.getSupplier().subscribe(
      data => {
        this.supplier = JSON.parse(data['_body']);
      }
    );
  }

  checkPassword(oldPassword : string){
    if(oldPassword == this.supplier.password){
      this.passwordCorrect = false;
    } else{
      this.passwordCorrect = true;
    }
  }

  onSubmit(form: NgForm) {
    let supplier = new Supplier();
    supplier.username = this.supplier.username;
    supplier.password = this.supplier.password;
    if(form.controls['newPassword1'].value != "" || form.controls['newPassword2'].value != ""){
      if(form.controls['newPassword1'].value != form.controls['newPassword2'].value){
        this.newPassErr.nativeElement.innerHTML = "Passwords are different!";
        return;
      } else{
        supplier.password = form.controls['newPassword1'].value;
        this.newPassErr.nativeElement.innerHTML = "";
      }
    }
    supplier.name = form.controls['name'].value;
    supplier.surname = form.controls['surname'].value;
    let router = this.router;
    this.httpService.modifySupplier(supplier).subscribe(
      () => {
        swal({title : "Success!", text : "Your data has been modified!", type : "success"}, function(){
          router.navigateByUrl('/home/supplier');
        });
      }
    );
  }

}
