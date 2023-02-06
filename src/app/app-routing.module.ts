import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
{
  path:'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
{
  path:'admin',
  loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
},
{
  path: '**', component: NotfoundComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
