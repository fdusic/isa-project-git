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
  private people : User[] = [];

  constructor(private httpService : LoginRegisterService) { }

  ngOnInit() {
    this.httpService.getUser().subscribe(
      data => {
        this.user = JSON.parse(data['_body']);
        console.log(this.user);
      }
    );
    this.httpService.getPeople().subscribe(
      data => {
        this.people = JSON.parse(data['_body']);
      }
    );
  }

  deleteFriend(user : User){
    this.httpService.deleteFriend(user.email).subscribe(
      () => {
        this.user.friends.splice(this.user.friends.indexOf(user),1);
      }
    );
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

}
