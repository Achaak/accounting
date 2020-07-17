import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ) {
    if (await this.authService.getJwtToken() === null) {
      this.router.navigate(['/auth'])
    }
    else {
      return true
    }
  }
}