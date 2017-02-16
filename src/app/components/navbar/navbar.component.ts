import { Component, OnInit } from '@angular/core';
import {LoginRegisterService} from "../../services/login-register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private httpService : LoginRegisterService, private router : Router) { }

  ngOnInit() {
  }

  logout(){
    this.httpService.logout().subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }

}
