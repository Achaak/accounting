import { Contacts } from './../API'
import { AuthService } from '../user/auth.service';
import { Subject } from 'rxjs';
import _ from 'lodash'

export class ContactsService {
  contactsSubject = new Subject<any[]>();

  private contacts = []

  constructor(private authService: AuthService) {}

  async init() {
    if (!this.contacts.length)
      await this.loadContacts()
  }

  emitContactsSubject() {
    this.contactsSubject.next(this.contacts.slice())
  }

  async loadContacts() {
    let status

    const func = await Contacts.getContacts(await this.authService.getJwtToken())

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.contacts = func.data
      this.emitContactsSubject();
    }
  }

  async getContactById(id) {
    return _.find(this.contacts, { id: parseInt(id) })
  }

  getContacts() {
    return this.contacts
  }

  async addContact(values) {
    let message
    let status

    const func = await Contacts.setContact(this.authService.jwtToken, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadContacts()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async updateContact(values, idContact) {
    let message
    let status

    const func = await Contacts.updateContact(this.authService.jwtToken, idContact, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadContacts()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async deleteContact(idContact) {
    let status

    const func = await Contacts.deleteContact(this.authService.jwtToken, idContact)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadContacts()
    }

    return {
      status: status
    }
  }
}