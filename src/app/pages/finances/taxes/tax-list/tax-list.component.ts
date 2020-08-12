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
import * as moment from 'moment';

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
  displayedColumns: string[] = ['label', 'target', 'value', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Date
  dateStart = moment(new Date(moment().startOf('month').format())).format("YYYY-MM-DD")
  dateEnd   = moment(new Date(moment().endOf('month').format())).format("YYYY-MM-DD")
  
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
        let taxesFinal = taxes
        
        if(this.dateStart) {
          const dateStart = new Date(this.dateStart).getTime()

          taxesFinal = taxesFinal.filter((o) => {
            return new Date(o.startDate).getTime() <= dateStart
          })
        }

        if(this.dateEnd) {
          const dateEnd = new Date(this.dateEnd).getTime()

          taxesFinal = taxesFinal.filter((o) => {
            return new Date(o.endDate).getTime() >= dateEnd
          })
        }

        this.taxes = taxesFinal

        this.dataSource = new MatTableDataSource<PeriodicElement>(taxesFinal);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.taxesService.emitTaxesSubject()
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

  setDateStart(value) {
    this.dateStart = value
    this.taxesService.emitTaxesSubject()
  }

  setDateEnd(value) {
    this.dateEnd = value
    this.taxesService.emitTaxesSubject()
  }
}

export interface PeriodicElement {
  label: string;
  target: string;
  value: string;
  startDate: string;
  endDate: string;
}
