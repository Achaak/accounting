import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './configs/routes.configs';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './services/user/auth.guard.service';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  { path: '', redirectTo: RoutesConfig.routes.home, pathMatch: 'full' },
  { path: routesNames.home, component: HomeComponent, canActivate: [AuthGuard] },
  { path: routesNames.auth, component: AuthComponent },

  // otherwise redirect to 404
  { path: '**', redirectTo: RoutesConfig.routes.error404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
