import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ActivityComponent } from '../components/activity/activity.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { RoleComponent } from '../components/role/role.component';
import { SharedModule } from '../shared.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from '../components/home/home.component';
import { ActivitymappingComponent } from '../components/activitymapping/activitymapping.component';


const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    {
      path: 'activity',
      component: ActivityComponent, canActivate: 
      [AuthGuard]
    },
    { path: 'role', component: RoleComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent},
    { path: 'mapping', component: ActivitymappingComponent}
  ]
}
]
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidenavComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminLayoutModule { }
