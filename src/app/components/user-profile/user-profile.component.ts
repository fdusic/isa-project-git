import {Component, OnInit} from "@angular/core";
import {LoginRegisterService} from "../../services/login-register.service";
import {User} from "../../beans/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private user : User = new User();
  private notFriends : User[] = [];
  private requestsSent : User[] = [];

  constructor(private httpService : LoginRegisterService) { }

  ngOnInit() {
    this.httpService.getUser().subscribe(
      data => {
        console.log(data);
        this.user = JSON.parse(data['_body']);
        console.log(this.user);
      }
    );
    this.httpService.getNotFriends().subscribe(
      data => {
        this.notFriends = JSON.parse(data['_body']);
        console.log(this.notFriends);
      }
    );
    this.httpService.getRequestsSent().subscribe(
      data => {
        this.requestsSent = JSON.parse(data['_body']);
        console.log('rs');
        console.log(this.requestsSent);
      }
    );

  }

  deleteFriend(user : User){
    /*this.httpService.deleteFriend(user.email).subscribe(
      () => {
        this.user.friends.splice(this.user.friends.indexOf(user),1);
      }
    );*/
  }

  sendRequest(user : User){
    this.httpService.sendRequest(user.email).subscribe(
      (data) => {
        if(data['_body'] == 'false')
          alert('Friend request already sent');
        else
          alert('Friend requset sent');
      }
    );
  }

  acceptFriendRequest(user : User){
    this.httpService.acceptRequest(user.email).subscribe(
      () => {}
    );
  }

  declineRequest(user : User){
    this.httpService.deleteFriend(user.email).subscribe(
      () => {}
    );
  }

  getStatus(email : string){

    for(var i=0; i < this.user.friends.length; i++){
      if(this.user.friends[i].usernameRequest.email == email){
        return this.user.friends[i].status;
      }
    }
    return 0;

  }

}
