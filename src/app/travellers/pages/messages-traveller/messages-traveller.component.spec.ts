import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesTravellerComponent } from './messages-traveller.component';

describe('MessagesTravellerComponent', () => {
  let component: MessagesTravellerComponent;
  let fixture: ComponentFixture<MessagesTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
