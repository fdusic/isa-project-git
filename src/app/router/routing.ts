import {Routes, RouterModule} from "@angular/router";
import {LoginRegisterComponent} from "../components/login/login-register.component";
import {HomeComponent} from "../components/home/home.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {AddRestaurantComponent} from "../components/add-restaurant/add-restaurant.component";
import {EmailComponent} from "../components/email/email.component";
import {RestaurantDetailComponent} from "../components/restaurant-detail/restaurant-detail.component";
import {ModifyUserComponent} from "../components/modify-user/modify-user.component";
import {Guardian} from "../guardian";
import {RestaurantsComponent} from "../components/restaurants/restaurants.component";
import {AddMenuItemComponent} from "../components/add-menu-item/add-menu-item.component";
import {SupplierComponent} from "../components/supplier/supplier.component";
import {SupplierModifyComponent} from "../components/supplier-modify/supplier-modify.component";
import {
  EmployeeProfileComponent
} from "../components/waiter-profile/employee-profile.component";
import {
  ModifyEmployeeComponent
} from "../components/waiter-profile/modify-employee/modify-employee.component";
import {ChangeRestaurantComponent} from "../components/change-restaurant/change-restaurant.component";


const APP_ROUTES: Routes=[
    {path:'',component:LoginRegisterComponent},
    {path:'home',component:HomeComponent,
      children:[
       {path:'',component:UserProfileComponent, canActivate : [Guardian]},
       {path:'addrestaurant',component: AddRestaurantComponent},
       {path:'email/:email',component:EmailComponent},
       {path:'changerestaurant/:id',component:ChangeRestaurantComponent},
       {path:'restaurant/:name',component:RestaurantDetailComponent},
       {path: 'modifyUser', component:ModifyUserComponent, canActivate : [Guardian]},
       {path:'restaurants/addmenuitem/:name',component:AddMenuItemComponent},
       {path:'restaurants/:name',component:RestaurantDetailComponent},
       {path:'restaurants',component:RestaurantsComponent},
       {path: 'modifyUser', component:ModifyUserComponent},
       {path: 'modifyUser', component:ModifyUserComponent},
       {path: 'employee-profile', component:EmployeeProfileComponent},
       {path: 'modify-employee', component:ModifyEmployeeComponent},
       {path: 'supplier', component:SupplierComponent},
       {path : 'modify-supplier', component : SupplierModifyComponent}
     ]}
    ]

export const routing = RouterModule.forRoot(APP_ROUTES);
