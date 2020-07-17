import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import taxes_target from 'src/app/configs/tax-target.config';
import { TaxesService } from 'src/app/services/taxes/taxes.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.sass']
})
export class TaxFormComponent implements OnInit {

  navLeft = navLeftConfigs.finances

  messageAlert: String

  idTaxe = null
  taxe = {
    label: undefined,
    target: undefined,
    value: undefined,
    startDate: undefined,
    endDate: undefined,
  }
  
  taxes_target = taxes_target
  submitText: String

  constructor(private taxesService: TaxesService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idTaxe = this.route.snapshot.params['id'];

    if(this.idTaxe) this.initTaxe()
    
    this.initSubmitText()
  }

  onSubmit(form: NgForm) {
    const values = {
      label:     form.value['label'] || null,
      target:    form.value['target'] || null,
      value:     form.value['value'] || null,
      startDate: form.value['startDate'] || null,
      endDate:   form.value['endDate'] || null,
    }

    if(this.idTaxe) this.updateTaxe(values)
    else this.newTaxe(values)
  }

  async initTaxe() {
    await this.taxesService.init()

    this.taxe = await this.taxesService.getTaxById(this.idTaxe)
  }

  initSubmitText() {
    if(this.idTaxe) this.submitText = "Modifier"
    else this.submitText = "Ajouter"
  }
 
  newTaxe(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      console.log(values)
      const response = await this.taxesService.addTax(values)
  
      this.messageAlert = response.message
    })
  }

  updateTaxe(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.taxesService.updateTax(values, this.idTaxe)
  
      this.messageAlert = response.message
    })
  }
}