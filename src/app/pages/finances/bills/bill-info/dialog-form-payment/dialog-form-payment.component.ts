import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillsService } from 'src/app/services/bills/bills.service';

@Component({
  selector: 'app-dialog-form-payment',
  templateUrl: './dialog-form-payment.component.html',
  styleUrls: ['./dialog-form-payment.component.sass']
})
export class DialogFormPaymentComponent implements OnInit {

  form: FormGroup;
  label: String
  amount: Number
  date: Date
  idBill: Number
  idPayment: Number

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormPaymentComponent>,
    private billsService: BillsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.label = data.label
    this.amount = data.amount
    this.date = data.date
    this.idBill = data.idBill
    this.idPayment = data.idPayment
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      label: [this.label],
      amount: [this.amount],
      date: [this.date],
      bill: this.idBill
    });
  }

  onSubmit() {
    console.log(this.idPayment)
    if(this.idPayment !== undefined)
      this.billsService.updateBillPayment(this.form.value, this.idPayment)
    else
      this.billsService.addBillPayment(this.form.value)
    
    this.dialogRef.close(this.form.value);
  }
}
