import { Component, OnInit } from '@angular/core';
import {User} from "../../beans/user";

@Component({
  selector: 'app-login',
  templateUrl: 'login-register.component.html',
  styleUrls: ['login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmitRegister(user:User){

  }

  onSubmitLogin(user:User){

  }

}
