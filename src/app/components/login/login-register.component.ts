import {Component, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('reg_li') regLi : any;
  @ViewChild('log_li') logLi : any;
  @ViewChild('log_div') logDiv : any;
  @ViewChild('reg_div') regDiv : any;
  @ViewChild('email') email : any;
  @ViewChild('f') form : any;

  constructor(private httpService : LoginRegisterService, private router : Router) { }

  ngOnInit() {
  }

  onSubmitRegister(user : User){
    this.httpService.register(user).subscribe(
      () =>{
        this.regLi.nativeElement.classList.remove('active');
        this.logLi.nativeElement.classList.add('active');
        this.regDiv.nativeElement.classList.remove('active');
        this.regDiv.nativeElement.classList.remove('fade');
        this.regDiv.nativeElement.classList.remove('in');
        this.logDiv.nativeElement.classList.add('active');
        this.logDiv.nativeElement.classList.add('fade');
        this.logDiv.nativeElement.classList.add('in');

        var dirtyFormID = 'regForm';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
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
        console.log(data['_body']);
        if(data['_body'] == 'true') {
          document.getElementById('err_span').innerHTML = 'Email \'' + email + '\' already exists.';
        }
        else {
          document.getElementById('err_span').innerHTML = '';
        }
      }
    );
  }

}
