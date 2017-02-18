import {Routes, RouterModule} from "@angular/router";
import {LoginRegisterComponent} from "../components/login/login-register.component";
import {HomeComponent} from "../components/home/home.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {AddRestaurantComponent} from "../components/add-restaurant/add-restaurant.component";
import {EmailComponent} from "../components/email/email.component";

const APP_ROUTES: Routes=[
    {path:'',component:LoginRegisterComponent},
    {path:'home',component:HomeComponent,
     children:[
       {path:'',component:UserProfileComponent},
       {path:'addrestaurant',component: AddRestaurantComponent},
       {path:'email/:email',component:EmailComponent}
     ]}
    ]

export const routing = RouterModule.forRoot(APP_ROUTES);
