import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxInvalidFormComponent } from './dialog-box-invalid-form.component';

describe('DialogBoxInvalidFormComponent', () => {
  let component: DialogBoxInvalidFormComponent;
  let fixture: ComponentFixture<DialogBoxInvalidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxInvalidFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxInvalidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
