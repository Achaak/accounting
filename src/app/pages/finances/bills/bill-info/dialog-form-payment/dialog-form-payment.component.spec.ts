import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormPaymentComponent } from './dialog-form-payment.component';

describe('DialogFormPaymentComponent', () => {
  let component: DialogFormPaymentComponent;
  let fixture: ComponentFixture<DialogFormPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFormPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
