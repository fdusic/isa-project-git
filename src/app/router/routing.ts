import {Routes, RouterModule} from "@angular/router";
import {LoginRegisterComponent} from "../components/login/login-register.component";
import {HomeComponent} from "../components/home/home.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {AddRestaurantComponent} from "../components/add-restaurant/add-restaurant.component";
import {EmailComponent} from "../components/email/email.component";
import {RestaurantDetailComponent} from "../components/restaurant-detail/restaurant-detail.component";
import {ModifyUserComponent} from "../components/modify-user/modify-user.component";
import {RestaurantsComponent} from "../components/restaurants/restaurants.component";
import {AddMenuItemComponent} from "../components/add-menu-item/add-menu-item.component";

const APP_ROUTES: Routes=[
    {path:'',component:LoginRegisterComponent},
    {path:'home',component:HomeComponent,
     children:[
       {path:'',component:UserProfileComponent},
       {path:'addrestaurant',component: AddRestaurantComponent},
       {path:'email/:email',component:EmailComponent},
       {path:'restaurants/addmenuitem/:name',component:AddMenuItemComponent},
       {path:'restaurants/:name',component:RestaurantDetailComponent},
       {path:'restaurants',component:RestaurantsComponent},
       {path: 'modifyUser', component:ModifyUserComponent}
     ]}
    ]

export const routing = RouterModule.forRoot(APP_ROUTES);
