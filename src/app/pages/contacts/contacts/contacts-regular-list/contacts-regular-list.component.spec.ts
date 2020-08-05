import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsRegularListComponent } from './contacts-regular-list.component';

describe('ContactsRegularListComponent', () => {
  let component: ContactsRegularListComponent;
  let fixture: ComponentFixture<ContactsRegularListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsRegularListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsRegularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
