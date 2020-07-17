import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { RoutesConfig } from './../../configs/routes.configs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  nav = [
    {
      label: "Clients",
      link: RoutesConfig.routes.clients
    }, {
      label: "Finances",
      link: RoutesConfig.routes.finances
    }
  ]

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.userService.onLogout()
  }
}
