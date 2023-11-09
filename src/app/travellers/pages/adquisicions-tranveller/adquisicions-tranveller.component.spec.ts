import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquisicionsTranvellerComponent } from './adquisicions-tranveller.component';

describe('AdquisicionsTranvellerComponent', () => {
  let component: AdquisicionsTranvellerComponent;
  let fixture: ComponentFixture<AdquisicionsTranvellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdquisicionsTranvellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdquisicionsTranvellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
