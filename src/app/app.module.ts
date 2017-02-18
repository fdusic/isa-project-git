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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [LoginRegisterService,ManagerService,RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
