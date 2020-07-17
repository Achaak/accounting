import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.sass']
})
export class BillFormComponent implements OnInit {

  navLeft = navLeftConfigs.finances

  constructor() { }

  ngOnInit(): void {
  }

}
