import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchsTravellerComponent } from './matchs-traveller.component';

describe('MatchsTravellerComponent', () => {
  let component: MatchsTravellerComponent;
  let fixture: ComponentFixture<MatchsTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchsTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchsTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
