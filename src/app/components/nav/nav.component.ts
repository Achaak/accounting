import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  
  @Input() nav
  isOpen = false

  constructor() { }

  ngOnInit(): void {}

  onOpen(bool) {
    this.isOpen = bool
  }
}
