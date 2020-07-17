import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import taxes_target from 'src/app/configs/tax-target.config';
import { Subscription } from 'rxjs';
import { RoutesConfig } from 'src/app/configs/routes.configs';
import { TaxesService } from 'src/app/services/taxes/taxes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import _ from 'lodash'

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.sass']
})
export class TaxListComponent implements OnInit {
  // Font awesome
  faPen = faPen
  faTrash = faTrash
  
  // Data taxes
  taxes: any[]
  taxesSubscription: Subscription

  updateTaxRoute = RoutesConfig.routes.taxUpdate
  
  // Table
  displayedColumns: string[] = ['label', 'target', 'value', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  // Nav left
  navLeft = navLeftConfigs.finances

  constructor(private taxesService: TaxesService, public dialog: MatDialog) { }

  ngOnInit(): void {

    // Initialize the taxes
    this.initTaxes()
  }

  async initTaxes() {
    await this.taxesService.init()

    this.taxesSubscription = this.taxesService.taxesSubject.subscribe(
      (taxes: any) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(taxes);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.taxesService.emitAppareilSubject()
  }

  onDelete(idTaxe) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain de supprimer cette taxe ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.taxesService.deleteTax(idTaxe)
    })
  }

  getTargetTaxLabel(value) {
    return _.find(taxes_target, { value: value})
  }
}

export interface PeriodicElement {
  label: string;
  target: string;
  value: string;
}
