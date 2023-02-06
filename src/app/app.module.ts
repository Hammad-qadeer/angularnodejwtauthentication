import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { UserComponent } from './components/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { SidenavComponent } from './admin-layout/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './admin-layout/header/header.component';
import { ActivitydialogComponent } from './components/activitydialog/activitydialog.component';
import { RoleComponent } from './components/role/role.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivitymappingComponent } from './components/activitymapping/activitymapping.component';
import { ActivitymappingdialogComponent } from './components/activitymappingdialog/activitymappingdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ActivitydialogComponent,
    // SidenavComponent,
    // HeaderComponent,
    RoleComponent,
    ActivityComponent,
    ActivitymappingComponent,
    ActivitymappingdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,  
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
