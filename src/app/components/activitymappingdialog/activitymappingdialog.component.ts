import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { RolesService } from 'src/app/_services/roles.service';

@Component({
  selector: 'app-activitymappingdialog',
  templateUrl: './activitymappingdialog.component.html',
  styleUrls: ['./activitymappingdialog.component.scss']
})
export class ActivitymappingdialogComponent {

  userRoles: any;
  userActivities: any;
  panelOpenState = false;
  displayedColumns: string[] = ['name', 'create', 'read', 'update', 'delete'];
  dataSource = new MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  public assignActivity!: FormGroup;

  constructor(private roleService: RolesService, private formBuilder: FormBuilder, private activityService: ActivitiesService) {}

  ngOnInit() {
    this.assignActivity = this.formBuilder.group({
      role_id: ['', Validators.required],
      activity_id: [''],
      isCreate: [false],
      isRead: [false],
      isUpdate: [false],
      isDelete: [false]
    });
    this.getRoles();
    this.getActivities();
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  onAssignActivity() {
    debugger
    const data = this.assignActivity.value;
    console.log(data);
    this.activityService.assignActivityToRole(data)
      .subscribe(res => {
        console.log('Activity assigned to role successfully!');
      }, (err) => {
        console.log(err);
      });
}


  isAllSelected(): boolean {
    const numRows = this.dataSource.data.length;
    let selectedcount : number ;
    selectedcount= 0 ; 
    if (numRows === selectedcount) { 
      return true
    }
    return false;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }

  getActivities() {
    this.activityService.getActivities().subscribe({
      next: (res: any)=> {
        this.userActivities = res;
      },
      error: (err)=> {
        console.log(err)
      }
    })
  }

  getRoles() {
    this.roleService.getRolesList().subscribe(data => {
      debugger
      this.userRoles = data;
    });
  } 
}
