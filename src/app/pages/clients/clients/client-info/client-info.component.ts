import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.sass']
})
export class ClientInfoComponent implements OnInit {

  navLeft = navLeftConfigs.clients

  constructor() { }

  ngOnInit(): void {
  }

}
