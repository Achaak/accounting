import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { NgForm } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from './../../../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass']
})
export class ContactFormComponent implements OnInit {
  
  navLeft = navLeftConfigs.contacts

  messageAlert: String

  idContact = null
  contact = {
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

  constructor(private contactsService: ContactsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idContact = this.route.snapshot.params['id'];

    if(this.idContact) this.initContact()

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

    if(this.idContact) this.updateContact(values)
    else this.newContact(values)
  }

  async initContact() {
    await this.contactsService.init()

    this.contact = await this.contactsService.getContactById(this.idContact)
  }

  initSubmitText() {
    if(this.idContact) this.submitText = "Modifier"
    else this.submitText = "Ajouter"
  }
 
  newContact(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.contactsService.addContact(values)
  
      this.messageAlert = response.message
    })
  }

  updateContact(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.contactsService.updateContact(values, this.idContact)
  
      this.messageAlert = response.message
    })
  }
}
