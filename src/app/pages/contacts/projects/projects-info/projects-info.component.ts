import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';

@Component({
  selector: 'app-projects-info',
  templateUrl: './projects-info.component.html',
  styleUrls: ['./projects-info.component.sass']
})
export class ProjectsInfoComponent implements OnInit {

  navLeft = navLeftConfigs.contacts
  
  constructor() { }

  ngOnInit(): void {
  }

}
