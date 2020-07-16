import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  messageAlert: String

  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.getJwtToken() !== null) 
      this.router.navigate(['/'])
  }

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    const response = await this.authService.signIn({identifier: form.value["identifier"], password: form.value["password"]})

    this.messageAlert = response.message
  }
}
