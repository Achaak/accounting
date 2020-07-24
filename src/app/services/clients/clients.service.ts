import { Clients } from './../API'
import { AuthService } from '../user/auth.service';
import { Subject } from 'rxjs';
import _ from 'lodash'

export class ClientsService {
  clientsSubject = new Subject<any[]>();

  private clients = []

  constructor(private authService: AuthService) {}

  async init() {
    if (!this.clients.length)
      await this.loadClients()
  }

  emitClientsSubject() {
    this.clientsSubject.next(this.clients.slice())
  }

  async loadClients() {
    let status

    const func = await Clients.getClients(await this.authService.getJwtToken())

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.clients = func.data
      this.emitClientsSubject();
    }
  }

  async getClientById(id) {
    return _.find(this.clients, { id: parseInt(id) })
  }

  getClients() {
    return this.clients
  }

  async addClient(values) {
    let message
    let status

    const func = await Clients.setClient(this.authService.jwtToken, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadClients()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async updateClient(values, idClient) {
    let message
    let status

    const func = await Clients.updateClient(this.authService.jwtToken, idClient, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadClients()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async deleteClient(idClient) {
    let status

    const func = await Clients.deleteClient(this.authService.jwtToken, idClient)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadClients()
    }

    return {
      status: status
    }
  }
}