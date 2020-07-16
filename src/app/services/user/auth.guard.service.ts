import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log('authService')
  }

  async canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ) {
    console.log(await this.authService.getJwtToken())
    if (await this.authService.getJwtToken() === null) {
      this.router.navigate(['/auth'])
    }
    else {
      return true
    }
  }
}