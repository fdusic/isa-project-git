import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login/login-register.component';
import { HomeComponent } from './components/home/home.component';
import {routing} from "./router/routing";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {LoginRegisterService} from "./services/login-register.service";
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import {ManagerService} from "./services/manager.service";
import { EmailComponent } from './components/email/email.component';
import {RestaurantService} from "./services/restaurant.service";
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import {RoleService} from "./services/role.service";
import { ModifyUserComponent } from './components/modify-user/modify-user.component';
import {Guardian} from "./guardian";
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { AddMenuItemComponent } from './components/add-menu-item/add-menu-item.component';
import { EmployeeProfileComponent} from './components/waiter-profile/employee-profile.component';
import {EmployeeService} from "./services/employee.service";
import { ModifyEmployeeComponent} from './components/waiter-profile/modify-employee/modify-employee.component';
import { ChangeRestaurantComponent } from './components/change-restaurant/change-restaurant.component';

import { SupplierComponent } from './components/supplier/supplier.component';
import {SupplierService} from "./services/supplier.service";
import { SupplierModifyComponent } from './components/supplier-modify/supplier-modify.component';
import { AddOrderComponent } from './components/waiter-profile/add-order/add-order.component';
import { ChangeOrderComponent } from './components/waiter-profile/change-order/change-order.component';
import { SetPasswordComponent } from './components/login/set-password/set-password.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { RezervationComponent } from './components/rezervation/rezervation.component';
import { DateTimePickerModule } from 'ng2-date-time-picker';
import { RezervationInviteComponent } from './components/rezervation-invite/rezervation-invite.component';
import { AdminComponent } from './components/admin/admin.component';
import {AdminService} from "./services/admin.service";
import { RezervationsComponent } from './components/rezervations/rezervations.component';
import {RezervationService} from "./services/rezervation.service";
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    UserProfileComponent,
    NavbarComponent,
    AddRestaurantComponent,
    ManagerProfileComponent,
    EmailComponent,
    RestaurantDetailComponent,
    ModifyUserComponent,
    RestaurantsComponent,
    AddMenuItemComponent,
    EmployeeProfileComponent,
    ModifyEmployeeComponent,
    ChangeRestaurantComponent,
    SupplierComponent,
    SupplierModifyComponent,
    AddOrderComponent,
    ChangeOrderComponent,
    SetPasswordComponent,
    RezervationComponent,
    RezervationInviteComponent,
    AdminComponent,
    RezervationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DateTimePickerModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7CjHO9NDrwajILB8gTeNn88_3K0FLdWM'
    })
  ],
  providers: [LoginRegisterService,ManagerService,RestaurantService, RoleService, Guardian, SupplierService,EmployeeService, AdminService, RezervationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
