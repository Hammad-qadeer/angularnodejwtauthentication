import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: StorageService, private myRoute: Router, private toastr: ToastrService) {}

  public showWarning(): void {
    debugger
    this.toastr.warning('Access denied', 'Please login to continue access');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.storage.isLoggedIn()) {
        return true;
      }
      else{
        debugger
        this.myRoute.navigate(["/login"]);
        this.showWarning();
        return false;
      }
  }
  
}
