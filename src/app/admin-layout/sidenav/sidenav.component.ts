import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';
import { ActivitiesService } from 'src/app/_services/activities.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  disabled = false;
  assignedActivities: any;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private activityService: ActivitiesService) {}
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  ngOnInit() {
    debugger
    this.disabled = true;
    const user = this.storageService.getUser();
        this.activityService.getAssignedActivities(user.id).subscribe((activities)=> {
          setTimeout(() => this.disabled = false, 5000);
          this.assignedActivities = activities;
        })
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['/login'])
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
