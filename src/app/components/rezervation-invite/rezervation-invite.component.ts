import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantService} from "../../services/restaurant.service";
import {Rezervation} from "../../beans/rezervation";
import {MenuItem} from "../../beans/menu-item";
import {RezervationOrder} from "../../beans/rezervation-order";
import {ViewChild} from "@angular/core/src/metadata/di";
import {RezervationInvite} from "../../beans/rezervation-invite";
import {User} from "../../beans/user";
import {LoginRegisterService} from "../../services/login-register.service";
declare let swal:any;

@Component({
  selector: 'app-rezervation-invite',
  templateUrl: './rezervation-invite.component.html',
  styleUrls: ['./rezervation-invite.component.css']
})
export class RezervationInviteComponent implements OnInit {

  private rezervation:Rezervation = new Rezervation();
  private accepted:boolean = false;
  private menuItems:MenuItem[]=[];
  private foodMenu:MenuItem[]=[];
  private drinkMenu:MenuItem[]=[];
  private rezervationOrder:RezervationOrder = new RezervationOrder();


  @ViewChild('pre_prepared_check') pre_prepared_check : any;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private restaurantService:RestaurantService,private userService:LoginRegisterService) { }


  ngOnInit() {
    this.restaurantService.getRezervationById(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        this.rezervation = JSON.parse(data['_body']);
        for(let ri of this.rezervation.rezervationInvites){
          if(ri.invitedUser.email == this.activatedRoute.snapshot.params['email']){
            if(ri.status != 0){
              this.router.navigateByUrl('/');
            }
          }
        }
      }
    );

    this.userService.getUserByEmail(this.activatedRoute.snapshot.params['email']).subscribe(
      (data) => {
        this.rezervationOrder.user = JSON.parse(data['_body']);
      }
    );



  }


  onDecline(){
    this.restaurantService.declineInvite(this.activatedRoute.snapshot.params['invid']).subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }

  acceptInvite(){
    if(this.accepted == false){
      this.accepted = true;
      swal("Success!", "You accepted invite.", "success");
      this.restaurantService.getMenuItems(this.rezervation.restaurant).subscribe(
        (data) => {
          this.menuItems = JSON.parse(data['_body']);
          this.foodMenu = [];
          this.drinkMenu = [];
          for (var i = 0; i < this.menuItems.length; i++) {
            if (this.menuItems[i].menuItemType == 'FOOD') {
              this.foodMenu.push(this.menuItems[i]);
            } else {
              this.drinkMenu.push(this.menuItems[i]);
            }
          }
        }
      );
    }
  }

  addToOrders(menuItem:MenuItem){
    this.rezervationOrder.menuItems.push(menuItem);
    if(menuItem.menuItemType == 'FOOD'){
      document.getElementById('fooda'+menuItem.id).setAttribute('disabled','true');
    }else{
      document.getElementById('drinka'+menuItem.id).setAttribute('disabled','true');
    }


  }


  onPrePrepare(){
    if(this.pre_prepared_check.nativeElement.checked){
      this.rezervationOrder.finished = true;
    }else{
      this.rezervationOrder.finished = false;
    }
  }

  onFinish(){
    this.rezervation.rezervationOrders.push(this.rezervationOrder);

    for(let ri of this.rezervation.rezervationInvites){
      if(ri.invitedUser.email==this.activatedRoute.snapshot.params['email']){
        ri.status = 1;
        break;
      }
    }

    this.restaurantService.acceptInvite(this.rezervation).subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }

}
