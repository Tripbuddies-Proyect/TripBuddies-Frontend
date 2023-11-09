import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTravellerComponent } from './notification-traveller.component';

describe('NotificationTravellerComponent', () => {
  let component: NotificationTravellerComponent;
  let fixture: ComponentFixture<NotificationTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
