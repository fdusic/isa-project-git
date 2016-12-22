import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "../beans/user";

@Injectable()
export class LoginRegisterService {

  constructor(private http:Http) { }


  register(user:User){

  }

  login(user:User){
    
  }

}
