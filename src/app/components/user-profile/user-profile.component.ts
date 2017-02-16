import {Component, OnInit} from "@angular/core";
import {LoginRegisterService} from "../../services/login-register.service";
import {User} from "../../beans/user";
declare let swal : any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private user : User = new User();
  private notFriends : User[] = [];
  private requestsSent : User[] = [];
  private friends : User[] = [];
  private friendRequests : User[] = [];

  constructor(private httpService : LoginRegisterService) { }

  ngOnInit() {
    this.httpService.getUser().subscribe(
      data => {
        this.user = JSON.parse(data['_body']);
      }
    );
    this.httpService.getFriends().subscribe(
      data => {
        this.friends = JSON.parse(data['_body']);
      }
    );
  }

  getFriendRequests(){
    if(this.friendRequests.length == 0){
      this.httpService.getFriendRequests().subscribe(
        data => {
          this.friendRequests = JSON.parse(data['_body']);
        }
      );
    }
  }

  getNotFriends(){
    if(this.notFriends.length == 0){
      this.httpService.getNotFriends().subscribe(
        data => {
          this.notFriends = JSON.parse(data['_body']);
        }
      );
    }
  }

  getRequestsSent(){
    if(this.requestsSent.length == 0){
      this.httpService.getRequestsSent().subscribe(
        data => {
          this.requestsSent = JSON.parse(data['_body']);
        }
      );
    }
  }

  deleteFriend(user : User){
    /*this.httpService.deleteFriend(user.email).subscribe(
      () => {
        this.user.friends.splice(this.user.friends.indexOf(user),1);
      }
    );*/
    swal({
        title: "Are you sure you want to remove " + user.name + " " + user.password + " as friend?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function(){
        this.httpService.deleteFriend(user.email).subscribe(
          () => {
            this.friends.splice(this.friends.indexOf(user),1);
            swal("Deleted!", user.name + " " + user.surname + " is no longer your friend.", "success");
          }
        );
      });
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

   /* for(var i=0; i < this.user.friends.length; i++){
      if(this.user.friends[i].usernameRequest.email == email){
        return this.user.friends[i].status;
      }
    }
    return 0;*/
  }

}
