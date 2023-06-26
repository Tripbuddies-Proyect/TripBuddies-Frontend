import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesTravellerComponent } from './favorites-traveller.component';

describe('FavoritesTravellerComponent', () => {
  let component: FavoritesTravellerComponent;
  let fixture: ComponentFixture<FavoritesTravellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesTravellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
