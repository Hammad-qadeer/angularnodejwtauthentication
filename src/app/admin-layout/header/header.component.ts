import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any;
  @Output() toggleSideNavBar: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
    this.user = this.storageService.getUser();
  }

  toggleSidebar() {
    this.toggleSideNavBar.emit();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['/auth/login'])
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
