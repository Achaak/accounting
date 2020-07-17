import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { Subscription } from 'rxjs';
import { RoutesConfig } from 'src/app/configs/routes.configs';
import { BillsService } from 'src/app/services/bills/bills.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.sass']
})
export class BillListComponent implements OnInit {
  // Font awesome
  faPen = faPen
  faTrash = faTrash
  
  // Data bills
  bills: any[]
  billsSubscription: Subscription

  updateBillRoute = RoutesConfig.routes.billUpdate
  
  // Table
  displayedColumns: string[] = ['name', 'phone_number', 'mail', "website_link", 'city', 'actions'];
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
        this.dataSource = new MatTableDataSource<PeriodicElement>(bills);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.billsService.emitAppareilSubject()
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
}

export interface PeriodicElement {
  name: string;
  phone_number: string;
  mail: string;
  city: string;
  website_link: string;
}
