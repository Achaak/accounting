import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { RoutesConfig } from 'src/app/configs/routes.configs';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { Subscription } from 'rxjs';
import { faTrash, faPen, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contacts-regular-list',
  templateUrl: './contacts-regular-list.component.html',
  styleUrls: ['./contacts-regular-list.component.sass']
})
export class ContactsRegularListComponent implements OnInit {
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
        const contactsTmp = contacts.filter((item) => item.isContactRegulated)

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