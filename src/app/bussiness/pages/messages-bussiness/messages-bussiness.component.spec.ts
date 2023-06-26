import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesBussinessComponent } from './messages-bussiness.component';

describe('MessagesBussinessComponent', () => {
  let component: MessagesBussinessComponent;
  let fixture: ComponentFixture<MessagesBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
