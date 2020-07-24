import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BillsService } from 'src/app/services/bills/bills.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormPaymentComponent } from './dialog-form-payment/dialog-form-payment.component';
import { Subscription } from 'rxjs';
import _ from 'lodash'

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.sass']
})
export class BillInfoComponent implements OnInit {

  // Font awesome
  faPen = faPen
  faTrash = faTrash

  // Data bill
  idBill = null
  bill = {
    bill: undefined,
    client: undefined,
    tva: undefined,
    discount: undefined,
    label: undefined,
    billingDate: undefined,
    deliveryDate: undefined,
    total_ht: undefined,
    bill_payments: [],
    state: -1,
  }
  billsSubscription: Subscription

  navLeft = navLeftConfigs.finances

  constructor(
    private billsService: BillsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idBill = this.route.snapshot.params['id'];

    if(this.idBill) this.initBill()
  }

  async initBill() {
    await this.billsService.init()

    this.billsSubscription = this.billsService.billsSubject.subscribe(
      async (bills: any) => {
        this.bill = await this.billsService.getBillById(this.idBill)
      }
    )
    this.billsService.emitBillsSubject()
  }

  getLeftToPay() {
    let leftToPay = this.bill.total_ht+(this.bill.total_ht*(this.bill.tva/100))-this.bill.discount

    for (let i = 0; i < this.bill.bill_payments.length; i++) {
      const billPayment = this.bill.bill_payments[i];

      leftToPay -= billPayment.amount
    }
    return leftToPay
  }

  addPayment() {
    this.dialog.open(DialogFormPaymentComponent, {
      data: {
        idBill: this.idBill
      }
    })
  }

  onUpdatePayment(idPayment) {
    const payment = _.find(this.bill.bill_payments, {id: idPayment})


    this.dialog.open(DialogFormPaymentComponent, {
      data: {
        idBill: this.idBill,
        idPayment: idPayment,
        label: payment.label,
        amount: payment.amount,
        date: payment.date,
      }
    })
  }

  onDeletePayment(idPayment) {
    this.billsService.deleteBillPayment(idPayment)
  }
}