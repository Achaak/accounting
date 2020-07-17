import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Subscription } from 'rxjs';
import { faPen, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RoutesConfig } from './../../../../configs/routes.configs'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {
  // Font awesome
  faPen = faPen
  faTrash = faTrash
  faInfo = faInfo

  // Data clients
  clients: any[]
  clientsSubscription: Subscription

  updateClientRoute = RoutesConfig.routes.clientUpdate
  infoClientRoute = RoutesConfig.routes.clientInfo

  // Table
  displayedColumns: string[] = ['name', 'phone_number', 'mail', "website_link", 'city', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Nav left
  navLeft = navLeftConfigs.clients

  constructor(private clientsService: ClientsService, public dialog: MatDialog) { }

  ngOnInit(): void {

    // Initialize the clients
    this.initClients()
  }

  async initClients() {
    await this.clientsService.init()

    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: any) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(clients);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.clientsService.emitAppareilSubject()
  }

  onDelete(idClient) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain de supprimer ce client ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.clientsService.deleteClient(idClient)
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