import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {

  @Input() navLeft: Array<Object>
  @Input() title: String

  constructor() { }

  ngOnInit(): void {
  }

}
