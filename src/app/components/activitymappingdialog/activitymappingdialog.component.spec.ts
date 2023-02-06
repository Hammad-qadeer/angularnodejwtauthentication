import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitymappingdialogComponent } from './activitymappingdialog.component';

describe('ActivitymappingdialogComponent', () => {
  let component: ActivitymappingdialogComponent;
  let fixture: ComponentFixture<ActivitymappingdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitymappingdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitymappingdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
