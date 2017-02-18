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
    this.httpService.getFriendRequests().subscribe(
      data => {
        this.friendRequests = JSON.parse(data['_body']);
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
    let httpSer = this.httpService;
    let friends = this.friends;
    swal({
        title: "Are you sure you want to remove " + user.name + " " + user.password + " as friend?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function(){
        httpSer.deleteFriend(user.email).subscribe(
          () => {
            friends.splice(friends.indexOf(user),1);

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
    console.log('accept');
    this.httpService.acceptRequest(user.email).subscribe(
      () => {
        this.friendRequests.splice(this.friendRequests.indexOf(user),1);
        this.friends.push(user);
        swal("Success!", "You and " + user.name + " " + user.surname + " are now friends!", "success");
      }
    );
  }

  declineRequest(user : User){
    this.httpService.declineFriendRequest(user.email).subscribe(
      () => {
        this.friendRequests.splice(this.friendRequests.indexOf(user),1);
        swal("Success!", user.name + " " + user.surname + " has been declined!", "success");
      }
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

  addFriendRequest(receiver : User){
    this.httpService.addFriendRequest(receiver.email).subscribe(
      () => {
        this.notFriends.splice(this.notFriends.indexOf(receiver),1);
        this.requestsSent.push(receiver);
        swal("Success!", "Your friend request has been sent!", "success");
      }
    );
  }

  removeRequestSent(user : User){
    this.httpService.declineFriendRequest(user.email).subscribe(
      () => {
        this.requestsSent.splice(this.requestsSent.indexOf(user),1);
        this.notFriends.push(user);
        swal("Success!", "Request sent removed!", "success");
      }
    );
  }

}
