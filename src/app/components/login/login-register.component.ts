import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../beans/user";
import {LoginRegisterService} from "../../services/login-register.service";
import {Router} from "@angular/router";
import {document} from "@angular/platform-browser/src/facade/browser";
declare let sweetAlert : any;
declare let swal : any;
import {RoleService} from "../../services/role.service";

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
  @ViewChild('passRep') passRep : any;
  @ViewChild('pass') pass : any;
  @ViewChild('passErr') passErr : any;
  private canSubmitRegister:boolean = false;

  constructor(private httpService : LoginRegisterService, private router : Router, private roleService : RoleService) { }

  ngOnInit() {
  }

  onSubmitRegister(user: User) {
    this.httpService.register(user).subscribe(
      () => {
        swal({title: "Good job!", text: "You successfully registered!", type: "success"},this.resetAndRedirect(1));
      }
    );
    this.httpService.sendEmail(user.email).subscribe(
      () => {
      }
    );
  }

  resetAndRedirect(n : number){
    if(n == 1){
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
    } else{
      this.regLi.nativeElement.classList.add('active');
      this.logLi.nativeElement.classList.remove('active');
      this.regDiv.nativeElement.classList.add('active');
      this.regDiv.nativeElement.classList.add('fade');
      this.regDiv.nativeElement.classList.add('in');
      this.logDiv.nativeElement.classList.remove('active');
      this.logDiv.nativeElement.classList.remove('fade');
      this.logDiv.nativeElement.classList.remove('in');
      var dirtyFormID = 'logForm';
      var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
      resetForm.reset();
    }
  }

  onSubmitLogin(user : User){
    this.httpService.login(user).subscribe(
      data => {
        console.log(data['_body']);
        if(data['_body'] == 'user'){
          this.router.navigateByUrl('/home');
          this.roleService.user = true;
          this.roleService.getFriendRequests();
        }else if(data['_body']=='manager'){

        }else if(data['_body']=='check_email'){
          sweetAlert("Check your email!", "Please click on the link on your email to procced login.", "error");
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
          this.canSubmitRegister = false;
        }
        else {
          document.getElementById('err_span').innerHTML = '';
          this.canSubmitRegister = true;
        }
      }
    );
  }

  samePassword(){
    if(this.pass.nativeElement.value != this.passRep.nativeElement.value){
      this.passErr.nativeElement.innerHTML = 'Passwords don\'t match!';
      this.passRep.nativeElement.value = '';
    } else{
      this.passErr.nativeElement.innerHTML = '';
    }
  }

}
