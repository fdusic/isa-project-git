import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {HomeComponent} from "../components/home/home.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";

const APP_ROUTES: Routes=[
    {path:'',component:LoginComponent},
    {path:'home',component:HomeComponent,
     children:[
       {path:'',component:UserProfileComponent}
     ]}
    ]

export const routing = RouterModule.forRoot(APP_ROUTES);
