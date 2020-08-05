import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormPersonComponent } from './dialog-form-person.component';

describe('DialogFormPersonComponent', () => {
  let component: DialogFormPersonComponent;
  let fixture: ComponentFixture<DialogFormPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFormPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
