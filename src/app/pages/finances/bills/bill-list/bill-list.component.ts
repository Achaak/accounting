import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { Subscription } from 'rxjs';
import { RoutesConfig } from 'src/app/configs/routes.configs';
import { BillsService } from 'src/app/services/bills/bills.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import _ from 'lodash'

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.sass']
})
export class BillListComponent implements OnInit {
  // Font awesome
  faPen = faPen
  faTrash = faTrash
  faInfo = faInfo
  
  // Data bills
  bills: any[]
  billsSubscription: Subscription

  // Date
  dateStart: Date
  dateEnd: Date

  updateBillRoute = RoutesConfig.routes.billUpdate
  infoBillRoute = RoutesConfig.routes.billInfo
  
  // Table
  displayedColumns: string[] = ['label', 'billingDate', 'deliveryDate', 'total_ht', 'total_ttc', 'left-to-pay', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  // Nav left
  navLeft = navLeftConfigs.finances

  constructor(private billsService: BillsService, public dialog: MatDialog) { }

  ngOnInit(): void {

    // Initialize the bills
    this.initBills()
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

        this.dataSource = new MatTableDataSource<PeriodicElement>(billsFinal);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.billsService.emitBillsSubject()
  }

  onDelete(idBill) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain de supprimer cette bill ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.billsService.deleteBill(idBill)
    })
  }

  setDateStart(value) {
    this.dateStart = value
    this.billsService.emitBillsSubject()
  }

  setDateEnd(value) {
    this.dateEnd = value
    this.billsService.emitBillsSubject()
  }

  getLeftToPay(idBill) {
    const bills = _.find(this.bills, { id: idBill })
    
    let leftToPay = (bills.total_ht-bills.discount)*(1+(bills.tva/100))

    for (let paymentIndex = 0; paymentIndex < bills.bill_payments.length; paymentIndex++) {
      const bill_payments = bills.bill_payments[paymentIndex];
      
      leftToPay -= bill_payments.amount
    }

    return leftToPay
  }
}

export interface PeriodicElement {
  label: string;
  billingDate: Date;
  deliveryDate: Date;
  total_ht: number;
}
