import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsBussinessComponent } from './payments-bussiness.component';

describe('PaymentsBussinessComponent', () => {
  let component: PaymentsBussinessComponent;
  let fixture: ComponentFixture<PaymentsBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
