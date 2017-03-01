import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {User} from "../beans/user";

@Injectable()
export class LoginRegisterService{

  private path = 'http://localhost:8080/user/';

  constructor(private http:Http) { }

  register(user:User){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'register/', JSON.stringify(user), { headers : h });
  }

  login(user:User){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'login/', JSON.stringify(user), { headers : h, withCredentials : true });
  }

  checkEmail(email : string){
    return this.http.post(this.path + 'checkEmail/', email.trim());
  }

  getUser(){
    return this.http.get(this.path + 'getUser', {withCredentials : true});
  }

  deleteFriend(email : string){
    return this.http.post(this.path + 'deleteFriend', email ,{withCredentials : true});
  }

  getNotFriends(){
    return this.http.get(this.path + 'getNotFriends', { withCredentials : true} );
  }

  getRequestsSent(){
    return this.http.get(this.path + 'getRequestsSent', {withCredentials : true});
  }

  sendRequest(email : string){
    return this.http.post(this.path + "sendRequest", email, {withCredentials : true});
  }

  acceptRequest(email : string){
    return this.http.post(this.path + "acceptFriendRequest", email, {withCredentials : true});
  }

  declineRequest(email : string){
    return this.http.post(this.path + 'declineRequest', email, {withCredentials : true});
  }

  logout(){
    return this.http.get(this.path + 'logout', { withCredentials : true} );
  }

  getFriends(){
    return this.http.get(this.path + 'getFriends', {withCredentials : true});
  }

  getFriendRequests(){
    return this.http.get(this.path + 'getFriendRequests', {withCredentials : true});
  }

  sendEmail(email : string){
    return this.http.post(this.path + 'sendEmail/', email.trim(), {withCredentials : true});
  }

  deleteFromEmailHelper(email:string){
    return this.http.post(this.path + 'deleteFromEmailHelper/', email.trim(), {withCredentials : true});
  }

  addFriendRequest(receiver : string){
    return this.http.post(this.path + 'addFriendRequest', receiver, {withCredentials : true});
  }

  declineFriendRequest(email : string){
    return this.http.post(this.path + 'declineFriendRequest', email, {withCredentials : true});
  }

  modifyUser(user : User){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'modifyUser/', JSON.stringify(user), { headers : h, withCredentials : true });
  }

  checkPassword(password : string){
    return this.http.post(this.path + 'checkPassword', password, {withCredentials: true})
  }

  searchFriends(data : string){
    return this.http.post(this.path + 'searchFriends', data, { withCredentials : true });
  }

  searchPeople(data : string){
    return this.http.post(this.path + 'searchPeople', data, { withCredentials : true });
  }

  getUserByEmail(email:string){
    return this.http.post(this.path + 'getUserByEmail', email, { withCredentials : true });
  }

}
