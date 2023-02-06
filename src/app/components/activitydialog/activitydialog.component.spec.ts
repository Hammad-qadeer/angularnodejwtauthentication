import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitydialogComponent } from './activitydialog.component';

describe('ActivitydialogComponent', () => {
  let component: ActivitydialogComponent;
  let fixture: ComponentFixture<ActivitydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitydialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
