import {Component, OnInit, ViewChild} from "@angular/core";
import {User} from "../../beans/user";
import {NgForm} from "@angular/forms";
import {LoginRegisterService} from "../../services/login-register.service";
import {Router} from "@angular/router";
declare let swal : any;

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  private user: User = new User();
  private passwordCorrect = true;

  @ViewChild('invalidPassword') invalidPassword: any;
  @ViewChild('newPassErr') newPassErr : any;

  constructor(private httpService: LoginRegisterService, private router : Router) {
  }

  ngOnInit() {
    this.httpService.getUser().subscribe(
      data => {
        this.user = JSON.parse(data['_body']);
      }
    );
  }

  checkPassword(password: string) {
    this.httpService.checkPassword(password).subscribe(
      data => {
        if (data['_body'] == 'true') {
          this.invalidPassword.nativeElement.innerHTML = '';
          this.passwordCorrect = false;
        } else {
          this.invalidPassword.nativeElement.innerHTML = 'Invalid password';
          this.passwordCorrect = true;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    let user = new User();
    user.email = this.user.email;
    user.password = this.user.password;
    if(form.controls['newPassword1'].value != "" || form.controls['newPassword2'].value != ""){
      if(form.controls['newPassword1'].value != form.controls['newPassword2'].value){
        this.newPassErr.nativeElement.innerHTML = "Passwords are different!";
        return;
      } else{
        user.password = form.controls['newPassword1'].value;
        this.newPassErr.nativeElement.innerHTML = "";
      }
    }
    user.name = form.controls['name'].value;
    user.surname = form.controls['surname'].value;
    let router = this.router;
    this.httpService.modifyUser(user).subscribe(
      () => {
        swal({title : "Success!", text : "Your data has been modified!", type : "success"}, function(){
          router.navigateByUrl('/home');
        });
      }
    );
  }

}
