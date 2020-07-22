import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bill-list-info',
  templateUrl: './bill-list-info.component.html',
  styleUrls: ['./bill-list-info.component.sass']
})
export class BillListInfoComponent implements OnInit {

  @Input() bills: Array<any>

  constructor() { }

  ngOnInit(): void {
  }

  getLeftToPay() {
    let leftToPay = 0

    for (let billIndex = 0; billIndex < this.bills.length; billIndex++) {
      const bill = this.bills[billIndex];

      let leftToPayBill = (bill.total_ht-bill.discount)*(1+(bill.tva/100))
      
      for (let billPaymentIndex = 0; billPaymentIndex < bill.bill_payments.length; billPaymentIndex++) {
        const bill_payments = bill.bill_payments[billPaymentIndex];
        
        leftToPay -= bill_payments.amount
      }

      leftToPay += leftToPayBill
    }

    return leftToPay
  }

  getTotalHT() {
    let totalHT = 0

    for (let billIndex = 0; billIndex < this.bills.length; billIndex++) {
      const bill = this.bills[billIndex];

      totalHT += bill.total_ht-bill.discount
    }

    return totalHT
  }

  getTotalTTC() {
    let totalTTC = 0

    for (let billIndex = 0; billIndex < this.bills.length; billIndex++) {
      const bill = this.bills[billIndex];

      totalTTC += (bill.total_ht-bill.discount)*(1+(bill.tva/100))
    }

    return totalTTC
  }

}
