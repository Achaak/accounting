import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormPersonComponent } from './dialog-form-person/dialog-form-person.component';
import _ from "lodash"
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.sass']
})
export class ContactInfoComponent implements OnInit {

  // Font awesome
  faPen = faPen
  faTrash = faTrash

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
    contact_people: []
  }
  contactsSubscription: Subscription

  navLeft = navLeftConfigs.contacts

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idContact = this.route.snapshot.params['id'];

    if(this.idContact) this.initContact()
  }

  async initContact() {
    await this.contactsService.init()

    this.contactsSubscription = this.contactsService.contactsSubject.subscribe(
      async (bills: any) => {
        this.contact = await this.contactsService.getContactById(this.idContact)
      }
    )
    this.contactsService.emitContactsSubject()
  }

  addPerson() {
    this.dialog.open(DialogFormPersonComponent, {
      data: {
        idContact: this.idContact
      }
    })
  }

  onUpdatePerson(idPerson) {
    const person = _.find(this.contact.contact_people, {id: idPerson})

    this.dialog.open(DialogFormPersonComponent, {
      data: {
        idContact:     this.idContact,
        idPerson:      idPerson,
        firstname:     person.firstname,
        lastname:      person.lastname,
        linkedin_link: person.linkedin_link,
      }
    })
  }

  onDeletePerson(idPerson) {
    this.contactsService.deleteContactPerson(idPerson)
  }
}
