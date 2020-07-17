import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { BillsService } from 'src/app/services/bills/bills.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.sass']
})
export class BillInfoComponent implements OnInit {

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
    state: -1,
  }

  navLeft = navLeftConfigs.finances

  constructor(private billsService: BillsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idBill = this.route.snapshot.params['id'];

    if(this.idBill) this.initBill()
  }

  async initBill() {
    await this.billsService.init()

    this.bill = await this.billsService.getBillById(this.idBill)
  }
}