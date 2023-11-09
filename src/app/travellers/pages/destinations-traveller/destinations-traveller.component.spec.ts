import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsTravellerComponent } from './destinations-traveller.component';

describe('DestinationsTravellerComponent', () => {
  let component: DestinationsTravellerComponent;
  let fixture: ComponentFixture<DestinationsTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationsTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationsTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
