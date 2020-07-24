import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { TaxesService } from 'src/app/services/taxes/taxes.service';
import { BillsService } from 'src/app/services/bills/bills.service';
import { Subscription } from 'rxjs';
import { getCA, getTotalHT, getTotalTTC, getLeftToPay } from '../../services/tools/finance';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.sass']
})
export class FinancesComponent implements OnInit {

  // Date
  dateStart: Date
  dateEnd: Date
  
  // Data taxes
  taxes: any[]
  taxesSubscription: Subscription

  // Data bills
  bills: any[]
  billsSubscription: Subscription

  navLeft = navLeftConfigs.finances

  constructor(private taxesService: TaxesService, private billsService: BillsService) { }

  ngOnInit(): void {

    // Initialize the taxes
    this.initTaxes()

    // Initialize the bills
    this.initBills()
  }

  async initTaxes() {
    await this.taxesService.init()

    this.taxesSubscription = this.taxesService.taxesSubject.subscribe(
      (taxes: any) => {
        let taxesFinal = taxes
        
        if(this.dateStart) {
          const dateStart = new Date(this.dateStart).getTime()

          taxesFinal = taxesFinal.filter((o) => {
            return new Date(o.billingDate).getTime() >= dateStart
          })
        }

        if(this.dateEnd) {
          const dateEnd = new Date(this.dateEnd).getTime()

          taxesFinal = taxesFinal.filter((o) => {
            return new Date(o.billingDate).getTime() <= dateEnd
          })
        }

        this.taxes = taxesFinal
      }
    )
    this.taxesService.emitTaxesSubject()
  }

  async initBills() {
    await this.billsService.init()

    this.billsSubscription = this.billsService.billsSubject.subscribe(
      (bills: any) => {
        let billsFinal = bills
        
        if(this.dateStart) {
          const dateStart = new Date(this.dateStart).getTime()

          billsFinal = billsFinal.filter((o) => {
            return new Date(o.billingDate).getTime() >= dateStart
          })
        }

        if(this.dateEnd) {
          const dateEnd = new Date(this.dateEnd).getTime()

          billsFinal = billsFinal.filter((o) => {
            return new Date(o.billingDate).getTime() <= dateEnd
          })
        }
        this.bills = billsFinal
      }
    )
    this.billsService.emitBillsSubject()
  }

  setDateStart(value) {
    this.dateStart = value
    this.billsService.emitBillsSubject()
    this.taxesService.emitTaxesSubject()
  }

  setDateEnd(value) {
    this.dateEnd = value
    this.billsService.emitBillsSubject()
    this.taxesService.emitTaxesSubject()
  }

  getTotalHT() { return getTotalHT(this.bills) }
  getTotalTTC() { return getTotalTTC(this.bills) }
  getLeftToPay() { return getLeftToPay(this.bills) }

  getTaxResult(tax) {
    const CA = getCA(this.bills)

    return CA*(tax.value/100)
  }
}
