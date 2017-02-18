import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginRegisterService} from "../../services/login-register.service";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private httpService:LoginRegisterService) { }

  ngOnInit() {
    this.httpService.deleteFromEmailHelper(this.activatedRoute.snapshot.params['email']).subscribe(
      (data) => {
          this.router.navigateByUrl('/');
      }
    );
  }

}
