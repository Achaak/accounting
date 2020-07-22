import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillListInfoComponent } from './bill-list-info.component';

describe('BillListInfoComponent', () => {
  let component: BillListInfoComponent;
  let fixture: ComponentFixture<BillListInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillListInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
