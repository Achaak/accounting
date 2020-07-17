import { Taxes } from './../API'
import { AuthService } from '../user/auth.service';
import { Subject } from 'rxjs';
import _ from 'lodash'

export class TaxesService {
  taxesSubject = new Subject<any[]>();

  private taxes = []

  constructor(private authService: AuthService) {}

  async init() {
    if (!this.taxes.length)
      await this.loadTaxes()
  }

  emitAppareilSubject() {
    this.taxesSubject.next(this.taxes.slice())
  }

  async loadTaxes() {
    let status

    const func = await Taxes.getTaxes(await this.authService.getJwtToken())

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.taxes = func.data
      this.emitAppareilSubject();
    }
  }

  async getTaxById(id) {
    return _.find(this.taxes, { id: parseInt(id) })
  }

  async addTax(values) {
    let message
    let status

    const func = await Taxes.setTax(this.authService.jwtToken, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadTaxes()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async updateTax(values, idTaxe) {
    let message
    let status

    const func = await Taxes.updateTax(this.authService.jwtToken, idTaxe, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadTaxes()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async deleteTax(idTaxe) {
    let status

    const func = await Taxes.deleteTax(this.authService.jwtToken, idTaxe)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadTaxes()
    }

    return {
      status: status
    }
  }
}