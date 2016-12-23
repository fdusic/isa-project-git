import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {User} from "../beans/user";

@Injectable()
export class LoginRegisterService {

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

  getPeople(){
    return this.http.get(this.path + 'getPeople', { withCredentials : true} );
  }

  sendRequest(email : string){
    return this.http.post(this.path + "sendRequest", email, {withCredentials : true});
  }

  acceptRequest(email : string){
    return this.http.post(this.path + "acceptRequest", email, {withCredentials : true});
  }

  declineRequest(email : string){
    return this.http.post(this.path + 'declineRequest', email, {withCredentials : true});
  }

}
