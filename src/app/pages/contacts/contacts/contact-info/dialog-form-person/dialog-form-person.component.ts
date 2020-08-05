import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogFormPaymentComponent } from 'src/app/pages/finances/bills/bill-info/dialog-form-payment/dialog-form-payment.component';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-dialog-form-person',
  templateUrl: './dialog-form-person.component.html',
  styleUrls: ['./dialog-form-person.component.sass']
})
export class DialogFormPersonComponent implements OnInit {

  form: FormGroup;
  firstname: String
  lastname: String
  linkedin_link: String
  idPerson: Number
  idContact: Number

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormPaymentComponent>,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.firstname     = data.firstname
    this.lastname      = data.lastname
    this.linkedin_link = data.linkedin_link
    this.idPerson      = data.idPerson
    this.idContact     = data.idContact
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname:     [this.firstname],
      lastname:      [this.lastname],
      linkedin_link: [this.linkedin_link],
      contact:       [this.idContact],
    });
  }

  onSubmit() {
    if(this.idPerson !== undefined)
      this.contactsService.updateContactPerson(this.form.value, this.idPerson)
    else
      this.contactsService.addContactPerson(this.form.value)
    
    this.dialogRef.close(this.form.value);
  }
}