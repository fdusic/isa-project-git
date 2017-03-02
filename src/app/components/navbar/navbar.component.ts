import { Component, OnInit } from '@angular/core';
import {LoginRegisterService} from "../../services/login-register.service";
import {Router} from "@angular/router";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private httpService : LoginRegisterService, private router : Router, private roleService : RoleService) { }

  ngOnInit() {
  }

  logout(){
    this.httpService.logout().subscribe(
      () => {
        this.roleService.supplier = false;
        this.roleService.admin = false;
        this.router.navigateByUrl('/');
      }
    );
  }

  onProfile(){
    console.log(this.roleService.user);
    if(this.roleService.user){
      this.router.navigateByUrl('/home');
    }else if(this.roleService.bartender || this.roleService.waiter || this.roleService.chef){
      this.router.navigateByUrl('/home/employee-profile');
    }
  }

}
