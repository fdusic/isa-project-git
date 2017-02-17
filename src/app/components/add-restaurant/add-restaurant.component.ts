import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../services/manager.service";
import {Manager} from "../../beans/manager";

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  private managers:Manager[]=[];

  constructor(private managerService:ManagerService) { }

  ngOnInit() {

    this.managerService.getAllManagers().subscribe(
      (data) => {
        this.managers = JSON.parse(data['_body']);
      }
    );
  }

}
