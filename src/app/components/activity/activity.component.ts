import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { ActivitydialogComponent } from '../activitydialog/activitydialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Activity } from 'src/app/_models/activity.model';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { groupBy } from 'lodash';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  disabled = false;
  assignedActivities: any;
  roleId!: number;

  
  displayedColumns: string[] = ['name', 'description', 'created_at', 'active', 'url', 'actions'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private activityService: ActivitiesService, private dialog: MatDialog, 
    private storageService : StorageService, 
    private userService: UserService, private toastrService: ToastrService) {}

    showSuccess(){
      this.toastrService.success('Activity deleted successfully', 'Major Error', {
     timeOut: 3000,
   });
     }

    showError(){
      this.toastrService.error('Error while fetching the records', 'Major Error', {
     timeOut: 3000,
   });
  }

  openDialog() {
    this.dialog.open(ActivitydialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
        this.getActivities();
    });
  }

  ngOnInit() {
    debugger
    this.getActivities();
    const user = this.storageService.getUser();
        this.activityService.getAssignedActivities(user.id).subscribe((activities)=> {
          this.assignedActivities = activities;
        })
  }

  getActivities() {
    this.activityService.getActivities().subscribe({
      next: (res: any)=> {
        setTimeout(() => this.disabled = false, 5000);
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=> {
        this.showError();
      }
    })
  }

  editActivity(element: any) {
    this.dialog.open(ActivitydialogComponent, {
      width: '40%',
      data: element
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getActivities();
      }
    })
  }

  deleteActivity(id: number) {
    debugger
    this.activityService.deleteActivity(id).subscribe({
      next:(res) => {
        this.showSuccess();
        this.getActivities();
      },
      error(err) {
        alert("Error while deleting the record")
      },
  })
  }

}
