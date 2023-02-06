import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { RolesService } from 'src/app/_services/roles.service';
import { ActivitydialogComponent } from '../activitydialog/activitydialog.component';
import { ActivitymappingdialogComponent } from '../activitymappingdialog/activitymappingdialog.component';

@Component({
  selector: 'app-activitymapping',
  templateUrl: './activitymapping.component.html',
  styleUrls: ['./activitymapping.component.scss']
})
export class ActivitymappingComponent {
  
  roles: any;
  activities: any;
  selectedRoleId!: number;
  selectedActivityId!: number;
  selectedPermissions: string[] = [];
  

  constructor(private roleService: RolesService, private activityService: ActivitiesService, private dialog: MatDialog) {}

  permissions = [
    { name: 'Create', value: 'create', selectedPermission: false },
    { name: 'Update', value: 'update', selectedPermission: false },
    { name: 'Delete', value: 'delete', selectedPermission: false },
    { name: 'Read', value: 'read', selectedPermission: false }
  ];

  
  ngOnInit() {
    debugger
    this.getRoles();
    this.getActivities();
  }

  openDialog() {
    this.dialog.open(ActivitymappingdialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
        this.getActivities();
    });
  }

  updateSelectedPermissions(event: any,permission: any) {
    if (event.target.checked) {
      this.selectedPermissions.push(permission.value);
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission.value);
    }
  }

  onAssignActivity() {
    debugger
    const data = {
      role_id: this.selectedRoleId,
      activity_id: this.selectedActivityId,
      permission:this.selectedPermissions.join(',')
    }
    this.activityService.assignActivityToRole(data)
      .subscribe(res => {
        console.log('Activity assigned to role successfully!');
      }, (err) => {
        console.log(err);
      });
}

  getRoles() {
    this.roleService.getRolesList().subscribe(data => {
      debugger
      this.roles = data;
    });
  } 

  getActivities() {
    debugger
    this.activityService.getActivities().subscribe({
      next: (res: any)=> {
        this.activities = res;
      },
      error: (err)=> {
        alert("Error while fetching the records")
      }
    })
  }

}
