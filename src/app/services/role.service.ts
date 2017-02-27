import {Injectable} from "@angular/core";
import {LoginRegisterService} from "./login-register.service";

@Injectable()
export class RoleService {

  public user : boolean = false;
  public waiter: boolean = false;
  public friendRequestCount : number;
  public supplier : boolean = false;
  public chef: boolean = false;
  public bartender: boolean = false;

  constructor(private httpService : LoginRegisterService) { }

  getFriendRequests(){
    this.httpService.getFriendRequests().subscribe(
      data => {
        let friendRequests = JSON.parse(data['_body']);
        this.friendRequestCount = friendRequests.length;
      }
    );
  }

}
