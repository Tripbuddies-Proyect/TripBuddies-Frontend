import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPlacesComponent } from './reviews-places.component';

describe('ReviewsPlacesComponent', () => {
  let component: ReviewsPlacesComponent;
  let fixture: ComponentFixture<ReviewsPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
