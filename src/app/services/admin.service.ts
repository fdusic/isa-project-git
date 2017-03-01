import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Manager} from "../beans/manager";
import {Admin} from "../beans/admin";

@Injectable()
export class AdminService {

  private path = 'http://localhost:8080/user/';

  constructor(private http : Http) { }

  getAdmin(){
    return this.http.get(this.path + 'getAdmin', { withCredentials : true });
  }

  addManager(m : Manager){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addManager/', JSON.stringify(m), { headers : h, withCredentials : true });
  }

  addAdmin(a : Admin){
    let h = new Headers();
    h.append('Content-type','application/json');
    return this.http.post(this.path + 'addAdmin/', JSON.stringify(a), { headers : h, withCredentials : true });
  }

}
