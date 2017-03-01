import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class RezervationService {

  private path = 'http://localhost:8080/rezervation/';

  constructor(private http : Http) { }

  getRezervations(){
    return this.http.get(this.path + 'getRezervations', { withCredentials : true});
  }

  rateRezervation(rezervation){
    let h = new Headers();
    h.append('Content-type', 'application/json');
    return this.http.post(this.path + 'rateRezervation/', JSON.stringify(rezervation), {headers: h,withCredentials: true });
  }
}
