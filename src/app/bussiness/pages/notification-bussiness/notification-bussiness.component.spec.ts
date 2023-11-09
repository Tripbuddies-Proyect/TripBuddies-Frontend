import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBussinessComponent } from './notification-bussiness.component';

describe('NotificationBussinessComponent', () => {
  let component: NotificationBussinessComponent;
  let fixture: ComponentFixture<NotificationBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
