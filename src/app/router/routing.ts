import {Routes, RouterModule} from "@angular/router";
import {LoginRegisterComponent} from "../components/login/login-register.component";
import {HomeComponent} from "../components/home/home.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";

const APP_ROUTES: Routes=[
    {path:'',component:LoginRegisterComponent},
    {path:'home',component:HomeComponent,
     children:[
       {path:'',component:UserProfileComponent}
     ]}
    ]

export const routing = RouterModule.forRoot(APP_ROUTES);
