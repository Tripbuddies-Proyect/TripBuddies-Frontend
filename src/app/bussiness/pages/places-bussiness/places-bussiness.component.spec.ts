import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesBussinessComponent } from './places-bussiness.component';

describe('PlacesBussinessComponent', () => {
  let component: PlacesBussinessComponent;
  let fixture: ComponentFixture<PlacesBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
