import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBussinessComponent } from './home-bussiness.component';

describe('HomeBussinessComponent', () => {
  let component: HomeBussinessComponent;
  let fixture: ComponentFixture<HomeBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
