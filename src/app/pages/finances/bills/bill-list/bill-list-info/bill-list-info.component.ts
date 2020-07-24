import { Component, OnInit, Input } from '@angular/core';
import { getTotalHT, getTotalTTC, getLeftToPay } from '../../../../../services/tools/finance';

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

  getLeftToPay() { return getLeftToPay(this.bills) }
  getTotalHT() { return getTotalHT(this.bills) }
  getTotalTTC() { return getTotalTTC(this.bills) }

}
