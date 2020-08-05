import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Subscription } from 'rxjs';
import { faPen, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RoutesConfig } from './../../../../configs/routes.configs'

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.sass']
})
export class ClientsListComponent implements OnInit {
  // Font awesome
  faPen = faPen
  faTrash = faTrash
  faInfo = faInfo

  // Data clients
  clients: any[]
  clientsSubscription: Subscription

  updateClientRoute = RoutesConfig.routes.contactsUpdate
  infoClientRoute = RoutesConfig.routes.contactsInfo

  // Table
  displayedColumns: string[] = ['name', 'phone_number', 'mail', "website_link", 'city', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Nav left
  navLeft = navLeftConfigs.contacts

  constructor(private contactsService: ContactsService, public dialog: MatDialog) { }

  ngOnInit(): void {

    // Initialize the clients
    this.initClients()
  }

  async initClients() {
    await this.contactsService.init()

    this.clientsSubscription = this.contactsService.contactsSubject.subscribe(
      (contacts: any) => {
        // Filter
        const contactsTmp = contacts.filter((item) => item.isClient)

        // Add contacts
        this.dataSource = new MatTableDataSource<PeriodicElement>(contactsTmp);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.contactsService.emitContactsSubject()
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

      const response = await this.contactsService.deleteContact(idClient)
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