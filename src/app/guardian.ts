import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Http} from "@angular/http";

@Injectable()
export class Guardian implements CanActivate{

  constructor(private http : Http, private router : Router){
  }

  canActivate(router : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean> | boolean {

    return this.http.get('http://localhost:8080/user/isLoged', {withCredentials : true}).map(
      auth => {
        console.log(auth['_body']);
        if(auth['_body'] == 'true')
          return true;
        else {
          this.router.navigateByUrl('');
          return false;
        }
      }
    );
  }
}
