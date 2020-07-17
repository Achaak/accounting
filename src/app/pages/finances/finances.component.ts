import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { TaxesService } from 'src/app/services/taxes/taxes.service';
import { BillsService } from 'src/app/services/bills/bills.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.sass']
})
export class FinancesComponent implements OnInit {
  
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
        this.taxes = taxes
      }
    )
    this.taxesService.emitAppareilSubject()
  }

  async initBills() {
    await this.billsService.init()

    this.billsSubscription = this.billsService.billsSubject.subscribe(
      (bills: any) => {
        this.bills = bills
      }
    )
    this.billsService.emitAppareilSubject()
  }
}
