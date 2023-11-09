import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTravellerComponent } from './profile-traveller.component';

describe('ProfileTravellerComponent', () => {
  let component: ProfileTravellerComponent;
  let fixture: ComponentFixture<ProfileTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
