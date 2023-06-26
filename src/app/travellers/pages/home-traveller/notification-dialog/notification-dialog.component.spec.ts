import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTravellerDialogComponent } from './notification-dialog.component';

describe('NotificationTravellerDialogComponent', () => {
  let component: NotificationTravellerDialogComponent;
  let fixture: ComponentFixture<NotificationTravellerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationTravellerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationTravellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
