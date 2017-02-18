import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {User} from "../../beans/user";
import {NgForm} from "@angular/forms";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  private user: User = new User();
  private passwordCorrect = true;

  @ViewChild('invalidPassword') invalidPassword: any;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.get('http://localhost:8080/user/getUser', {withCredentials: true}).subscribe(
      data => {
        this.user = JSON.parse(data['_body']);
      }
    );
  }

  checkPassword(password: string) {
    this.http.post('http://localhost:8080/user/checkPassword', password, {withCredentials: true}).subscribe(
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
    if (form.hasOwnProperty('newPassword1')) {
      if (!form.hasOwnProperty('newPassword2') || form.controls['newPassword1'].value != form.controls['newPassword2'].value) {
        console.log('greska');
        return;
      } else {
        form.controls['password'].value = form.controls['newPassword1'];
      }
      /*console.log(form.controls['newPassword1'].value);
       console.log(form.controls['newPassword2'].value);
       if (form.controls['newPassword1'].value != form.controls['newPassword2'].value) {
       console.log('greska');
       return;
       }*/
    }
  }

}
