import { Component, OnInit } from '@angular/core';
import {User} from "../../beans/user";
import {LoginRegisterService} from "../../services/login-register.service";
import {Router} from "@angular/router";
import {document} from "@angular/platform-browser/src/facade/browser";

@Component({
  selector: 'app-login',
  templateUrl: 'login-register.component.html',
  styleUrls: ['login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private httpService : LoginRegisterService, private router : Router) { }

  ngOnInit() {
  }

  onSubmitRegister(user : User){
    this.httpService.register(user).subscribe(
      () =>{
      }
    );
  }

  onSubmitLogin(user : User){
    this.httpService.login(user).subscribe(
      data => {
        console.log(data['_body']);
        if(data['_body'] != 'false'){
          this.router.navigateByUrl('/home');
        } else{
          document.getElementById('err_login').innerHTML = 'Incorrect email or password.';
        }
      }
    );
  }

  checkEmail(email : string){
    this.httpService.checkEmail(email).subscribe(
      data => {
        if(data['_body'] == 'false') {
          document.getElementById('err_span').innerHTML = 'Email already exists.';
        }
        else {
          document.getElementById('err_span').innerHTML = '';
        }
      }
    );
  }

}
