import { Contacts, ContactPeople } from './../API'
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
    let data

    const func = await Contacts.setContact(this.authService.jwtToken, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      data = func.data
      this.contacts.push(func.data)
      this.emitContactsSubject()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status,
      data: data
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

  async addContactPerson(values) {
    let message
    let status

    const func = await ContactPeople.setContactPerson(this.authService.jwtToken, values)

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

  async updateContactPerson(values, idPerson) {
    let message
    let status

    const func = await ContactPeople.updateContactPerson(this.authService.jwtToken, idPerson, values)

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
  
  async deleteContactPerson(idPerson) {
    let status

    const func = await ContactPeople.deleteContactPerson(this.authService.jwtToken, idPerson)

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