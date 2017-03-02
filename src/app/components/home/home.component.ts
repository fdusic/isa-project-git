import {Component, OnInit, OnDestroy} from "@angular/core";
import {RoleService} from "../../services/role.service";
import {Observable, Subscription} from "rxjs";
import {LoginRegisterService} from "../../services/login-register.service";

declare let swal : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub : Subscription;
  constructor(private roleService : RoleService, private httpService : LoginRegisterService) { }

  ngOnInit() {

    this.httpService.getRole().subscribe(
      data => {
        console.log(data['_body']);
        if(data['_body'] == 'user'){
          this.roleService.user = true;
          this.roleService.supplier = false;
          this.roleService.waiter = false;
          this.roleService.chef = false;
          this.roleService.bartender = false;
          this.roleService.admin = false;
          this.roleService.manager = false
        }else if(data['_body']=='manager'){
          this.roleService.user = false;
          this.roleService.supplier = false;
          this.roleService.waiter = false;
          this.roleService.chef = false;
          this.roleService.bartender = false;
          this.roleService.admin = false;
          this.roleService.manager = true;
        }else if (data['_body'] == 'waiter'){
          this.roleService.user = false;
          this.roleService.supplier = false;
          this.roleService.waiter = true;
          this.roleService.chef = false;
          this.roleService.bartender = false;
          this.roleService.admin = false;
          this.roleService.manager = false;
        }else if(data['_body'] == 'chef'){
          this.roleService.user = false;
          this.roleService.waiter = false;
          this.roleService.supplier = false;
          this.roleService.chef = true;
          this.roleService.bartender = false;
          this.roleService.admin = false;
          this.roleService.manager = false;
        }else if(data['_body'] == 'bartender'){
          this.roleService.user = false;
          this.roleService.waiter = false;
          this.roleService.chef = false;
          this.roleService.supplier = false;
          this.roleService.bartender = true;
          this.roleService.admin = false;
          this.roleService.manager = false;
        }else if(data['_body'] == 'supplier'){
          this.roleService.user = false;
          this.roleService.supplier = true;
          this.roleService.waiter = false;
          this.roleService.chef = false;
          this.roleService.bartender = false;
          this.roleService.admin = false;
        } else if(data['_body'] == 'admin'){
          this.roleService.user = false;
          this.roleService.supplier = true;
          this.roleService.waiter = false;
          this.roleService.chef = false;
          this.roleService.bartender = false;
          this.roleService.admin = false;
        }
      }
    );

    if(this.roleService.user){
      let timer = Observable.timer(2000,10000);
      this.sub = timer.subscribe(() => {
        this.httpService.getFriendRequests().subscribe(
          data => {
            let newFriendRequests = JSON.parse(data['_body']);
            let difference = newFriendRequests.length - this.roleService.friendRequestCount;
            if(difference > 0){
              swal({
                title: "You have " + difference + " new friend requests!",
                imageUrl: "images/user-default.png"
              });
              this.roleService.friendRequestCount = newFriendRequests.length;
            } else if(difference < 0){
              this.roleService.friendRequestCount = newFriendRequests.length;
            }
          }
        );
      });
    }
  }

  ngOnDestroy(){
    if(this.roleService.user){
      this.sub.unsubscribe();
      this.roleService.user = false;
    } else if(this.roleService.bartender || this.roleService.chef || this.roleService.waiter){
      this.roleService.bartender = false;
      this.roleService.chef = false;
      this.roleService.waiter = false;
      this.roleService.sub.unsubscribe();
    }
  }

}
