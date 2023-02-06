import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from 'src/app/_models/activity.model';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { RolesService } from 'src/app/_services/roles.service';
import { ActivitymappingdialogComponent } from '../activitymappingdialog/activitymappingdialog.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  roles: any;
  activities: any;
  selectedRoleId!: number;
  selectedActivityId!: number;
  selectedPermissions: string[] = [];

  role = {
    name: '',
    description: '',
    selectedRoleId: '',
  };

  permissions = [
    { name: 'Create', value: 'create', selectedPermission: false },
    { name: 'Update', value: 'update', selectedPermission: false },
    { name: 'Delete', value: 'delete', selectedPermission: false },
    { name: 'Read', value: 'read', selectedPermission: false }
  ];

    roleId!: number;
    assignedActivities!: Array<Activity>;

  constructor(private roleService: RolesService, private activityService: ActivitiesService, private dialog: MatDialog) {}

  ngOnInit() {
    debugger
    this.roleId = 6;
    this.getRoles();
    this.getActivities();
  }

  openDialog() {
    this.dialog.open(ActivitymappingdialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
        this.getActivities();
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

  addRole() {
    this.roleService.createRole(this.role)
      .subscribe(res => {
        this.getRoles();
        this.role.name = '';
        this.role.description = '';
      }, (err) => {
        console.log(err);
      });
  }

  editRole(role: any) {
    this.role = role;
  }

  // updateRole() {
  //   this.roleService.updateRole()
  //     .subscribe(res => {
  //       this.getRoles();
  //       this.role.name = '';
  //       this.role.description = '';
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

  deleteRole(id:any) {
    this.roleService.deleteRole(id)
      .subscribe(res => {
        this.getRoles();
      }, (err) => {
        console.log(err);
      });
  }

}
