import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBussinessComponent } from './profile-bussiness.component';

describe('ProfileBussinessComponent', () => {
  let component: ProfileBussinessComponent;
  let fixture: ComponentFixture<ProfileBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
