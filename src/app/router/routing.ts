import {Routes, RouterModule} from "@angular/router";
import {LoginRegisterComponent} from "../components/login/login-register.component";
import {HomeComponent} from "../components/home/home.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {AddRestaurantComponent} from "../components/add-restaurant/add-restaurant.component";
import {EmailComponent} from "../components/email/email.component";
import {RestaurantDetailComponent} from "../components/restaurant-detail/restaurant-detail.component";
import {ModifyUserComponent} from "../components/modify-user/modify-user.component";
import {Guardian} from "../guardian";

const APP_ROUTES: Routes=[
    {path:'',component:LoginRegisterComponent},
    {path:'home',component:HomeComponent,
      children:[
       {path:'',component:UserProfileComponent, canActivate : [Guardian]},
       {path:'addrestaurant',component: AddRestaurantComponent},
       {path:'email/:email',component:EmailComponent},
       {path:'restaurant/:name',component:RestaurantDetailComponent},
       {path: 'modifyUser', component:ModifyUserComponent, canActivate : [Guardian]}
     ]}
    ]

export const routing = RouterModule.forRoot(APP_ROUTES);
