import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  messageAlert: String

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    if(this.authService.getJwtToken() !== null) 
      this.router.navigate(['/'])
  }

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    const response = await this.userService.onLogin({identifier: form.value["identifier"], password: form.value["password"]})

    this.messageAlert = response.message
  }
}
