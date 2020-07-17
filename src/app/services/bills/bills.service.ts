import { Bills } from './../API'
import { AuthService } from '../user/auth.service';
import { Subject } from 'rxjs';
import _ from 'lodash'

export class BillsService {
  billsSubject = new Subject<any[]>();

  private bills = []

  constructor(private authService: AuthService) {}

  async init() {
    if (!this.bills.length)
      await this.loadBills()
  }

  emitAppareilSubject() {
    this.billsSubject.next(this.bills.slice())
  }

  async loadBills() {
    let status
    
    const func = await Bills.getBills(await this.authService.getJwtToken())

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.bills = func.data
      this.emitAppareilSubject();
    }
  }

  async getBillById(id) {
    return _.find(this.bills, { id: parseInt(id) })
  }

  async addBill(values) {
    let message
    let status

    const func = await Bills.setBill(this.authService.jwtToken, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadBills()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async updateBill(values, idBill) {
    let message
    let status

    const func = await Bills.updateBill(this.authService.jwtToken, idBill, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadBills()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async deleteBill(idBill) {
    let status

    const func = await Bills.deleteBill(this.authService.jwtToken, idBill)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadBills()
    }

    return {
      status: status
    }
  }
}