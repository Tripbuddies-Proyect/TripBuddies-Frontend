import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansBussinessComponent } from './plans-bussiness.component';

describe('PlansBussinessComponent', () => {
  let component: PlansBussinessComponent;
  let fixture: ComponentFixture<PlansBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
