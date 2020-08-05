import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.sass']
})
export class ContactInfoComponent implements OnInit {

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

  navLeft = navLeftConfigs.contacts

  constructor(private contactsService: ContactsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idContact = this.route.snapshot.params['id'];

    if(this.idContact) this.initContact()
  }

  async initContact() {
    await this.contactsService.init()

    this.contact = await this.contactsService.getContactById(this.idContact)
  }
}
