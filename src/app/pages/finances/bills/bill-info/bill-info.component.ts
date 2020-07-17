import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.sass']
})
export class BillInfoComponent implements OnInit {

  navLeft = navLeftConfigs.finances

  constructor() { }

  ngOnInit(): void {
  }

}
