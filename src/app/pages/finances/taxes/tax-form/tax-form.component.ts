import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.sass']
})
export class TaxFormComponent implements OnInit {
  
  navLeft = navLeftConfigs.finances

  constructor() { }

  ngOnInit(): void {
  }

}
