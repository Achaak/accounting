import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.sass']
})
export class ClientInfoComponent implements OnInit {

  idClient = null
  client = {
    name: undefined,
    address: undefined,
    postal_code: undefined,
    city: undefined,
    phone_number: undefined,
    mail: undefined,
    website_link: undefined,
    note: undefined,
  }

  navLeft = navLeftConfigs.clients

  constructor(private clientsService: ClientsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.params['id'];

    if(this.idClient) this.initClient()
  }

  async initClient() {
    await this.clientsService.init()

    this.client = await this.clientsService.getClientById(this.idClient)
  }
}
