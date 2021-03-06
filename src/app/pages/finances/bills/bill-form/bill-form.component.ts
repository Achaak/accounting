import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { BillsService } from 'src/app/services/bills/bills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.sass']
})
export class BillFormComponent implements OnInit {

  navLeft = navLeftConfigs.finances

  messageAlert: String

  idBill = null
  bill = {
    bill: undefined,
    contact: undefined,
    tva: undefined,
    discount: undefined,
    label: undefined,
    billingDate: undefined,
    deliveryDate: undefined,
    total_ht: undefined,
    state: 0,
  }
  contacts = []

  submitText: String

  constructor(
    private contactsService: ContactsService,
    private billsService: BillsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idBill = this.route.snapshot.params['id'];

    if(this.idBill) this.initBill()

    this.initClient()
    
    this.initSubmitText()
  }

  onSubmit(form: NgForm) {
    const values = {
      bill:            form.value['bill'] || null,
      tva:             form.value['tva'] || null,
      discount:        form.value['discount'] || null,
      label:           form.value['label'] || null,
      billingDate:     form.value['billingDate'] || null,
      deliveryDate:    form.value['deliveryDate'] || null,
      bill_deliveries: form.value['bill_deliveries'] || null,
      state:           form.value['state'],
      contact:         form.value['contact'],
      total_ht:        form.value['total_ht'] || null,
    }

    if(this.idBill) this.updateBill(values)
    else this.newBill(values)
  }

  async initBill() {
    await this.billsService.init()

    this.bill = await this.billsService.getBillById(this.idBill)

    console.log(this.bill)
  }

  async initClient() {
    await this.contactsService.init()

    this.contacts = this.contactsService.getContacts().filter((item) => item.isClient )
  }

  initSubmitText() {
    if(this.idBill) this.submitText = "Modifier"
    else this.submitText = "Ajouter"
  }
 
  newBill(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.billsService.addBill(values)

      if(response.status === 200) {
        this.router.navigate([`bill/info/${response.data.id}`])
      }
  
      this.messageAlert = response.message
    })
  }

  updateBill(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.billsService.updateBill(values, this.idBill)
  
      this.messageAlert = response.message
    })
  }
}
