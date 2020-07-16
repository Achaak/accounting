import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'my-app';

  constructor(private userService: UserService) {

  }
}
