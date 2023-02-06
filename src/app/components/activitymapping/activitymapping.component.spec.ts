import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitymappingComponent } from './activitymapping.component';

describe('ActivitymappingComponent', () => {
  let component: ActivitymappingComponent;
  let fixture: ComponentFixture<ActivitymappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitymappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitymappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
