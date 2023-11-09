import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPlacesBussinessComponent } from './post-places-bussiness.component';

describe('PostPlacesBussinessComponent', () => {
  let component: PostPlacesBussinessComponent;
  let fixture: ComponentFixture<PostPlacesBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPlacesBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPlacesBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
