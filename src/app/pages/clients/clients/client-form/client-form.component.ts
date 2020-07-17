import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { NgForm } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from './../../../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.sass']
})
export class ClientFormComponent implements OnInit {
  
  navLeft = navLeftConfigs.clients

  messageAlert: String

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

  submitText: String

  constructor(private clientsService: ClientsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.params['id'];

    if(this.idClient) this.initClient()

    this.initSubmitText()
  }

  onSubmit(form: NgForm) {
    const values = {
      name:         form.value['name'] || null,
      address:      form.value['address'] || null,
      postal_code:  form.value['postal_code'] || null,
      city:         form.value['city'] || null,
      phone_number: form.value['phone_number'] || null,
      mail:         form.value['mail'] || null,
      website_link: form.value['website_link'] || null,
      note:         form.value['note'] || null,
    }

    if(this.idClient) this.updateClient(values)
    else this.newClient(values)
  }

  async initClient() {
    await this.clientsService.init()

    this.client = await this.clientsService.getClientById(this.idClient)
  }

  initSubmitText() {
    if(this.idClient) this.submitText = "Modifier"
    else this.submitText = "Ajouter"
  }
 
  newClient(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.clientsService.addClient(values)
  
      this.messageAlert = response.message
    })
  }

  updateClient(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.clientsService.updateClient(values, this.idClient)
  
      this.messageAlert = response.message
    })
  }
}
