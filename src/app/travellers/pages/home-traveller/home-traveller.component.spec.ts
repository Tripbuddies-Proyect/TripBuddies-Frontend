import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTravellerComponent } from './home-traveller.component';

describe('HomeTravellerComponent', () => {
  let component: HomeTravellerComponent;
  let fixture: ComponentFixture<HomeTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
