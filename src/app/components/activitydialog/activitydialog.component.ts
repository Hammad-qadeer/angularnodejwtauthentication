import { Component, Inject } from '@angular/core';
import { ActivitiesService } from 'src/app/_services/activities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/_services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activitydialog',
  templateUrl: './activitydialog.component.html',
  styleUrls: ['./activitydialog.component.scss']
})
export class ActivitydialogComponent {

  assignedActivities: any;
  selectedParentId!: number;
  activityForm!: FormGroup;
  actionBtn : string = "Save";
  constructor(private activityService: ActivitiesService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<ActivitydialogComponent>,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastrService: ToastrService
    ) {
  }

  public showSuccess(): void {
    this.toastrService.success('Successfully Updated the Activity!');
  }

  ngOnInit() {
    this.activityForm = this.formBuilder.group({
      name: [''],
      description: [''],
      url: [''],
      active: [false],
      isParent: [false],
      parent_id: [''],
    });

    const user = this.storageService.getUser();
    this.activityService.getAssignedActivities(user.id).subscribe((activities)=> {
      this.assignedActivities = activities;
    })

    if(this.editData){
      this.actionBtn = "Update"
      this.activityForm.controls['name'].setValue(this.editData.name);
      this.activityForm.controls['description'].setValue(this.editData.description);
      this.activityForm.controls['url'].setValue(this.editData.url);
      this.activityForm.controls['active'].setValue(this.editData.active);
    }

  }

  addActivity() {
    if(!this.editData) {
      if(this.activityForm.valid) {
        if(this.activityForm.value.isParent) {
          this.activityForm.value.parent_id = null;
        }
        else{
        this.activityForm.value.parent_id = this.selectedParentId;
        }
        this.activityService.postActivity(this.activityForm.value)
        .subscribe({
          next: (res)=> {
            alert("Activity added Successfully");
            this.activityForm.reset();
            this.dialogRef.close('save')
          },
          error: ()=> {
            alert("Error while adding the activity")
          }
        }) 
      }
    }
    else {
      this.updateActivity()
    }
  }

  updateActivity() {
    this.activityService.updateActivity(this.activityForm.value, this.editData.id)
    .subscribe({
      next: (res)=> {
        this.showSuccess();
        this.activityForm.reset();
        this.dialogRef.close('update');
      },
      error:()=> {
        alert("Error while updating the record")
      }
    })
  }
}
