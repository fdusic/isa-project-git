import {Injectable} from "@angular/core";
import {LoginRegisterService} from "./login-register.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Injectable()
export class RoleService {

  public user : boolean = false;
  public waiter: boolean = false;
  public friendRequestCount : number;
  public supplier : boolean = false;
  public chef: boolean = false;
  public bartender: boolean = false;
  public admin : boolean = false;
  public sub : Subscription;

  constructor(private httpService : LoginRegisterService, private router : Router) { }

  getFriendRequests(){
    this.httpService.getFriendRequests().subscribe(
      data => {
        let friendRequests = JSON.parse(data['_body']);
        this.friendRequestCount = friendRequests.length;
        this.router.navigateByUrl('/home');
      }
    );
  }

}
