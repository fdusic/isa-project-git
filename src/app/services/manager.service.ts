import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ManagerService {

  private path = 'http://localhost:8080/manager/';

  constructor(private http:Http) { }


  getAllManagers(){
    return this.http.get(this.path + 'getAllManagers', { withCredentials : true} );
  }

}
