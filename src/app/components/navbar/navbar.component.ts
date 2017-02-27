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

  constructor(private httpService : LoginRegisterService, private router : Router, private roleService: RoleService) { }

  ngOnInit() {
  }

  logout(){
    this.httpService.logout().subscribe(
      () => {
        this.roleService.waiter = false;
        this.roleService.user = false;
        this.roleService.bartender = false;
        this.roleService.chef = false;
        this.roleService.supplier = false;
        this.router.navigateByUrl('/');
      }
    );
  }

}
