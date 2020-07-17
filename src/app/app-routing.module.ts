import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './configs/routes.configs';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './services/user/auth.guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { TaxFormComponent } from './pages/finances/taxes/tax-form/tax-form.component';
import { TaxListComponent } from './pages/finances/taxes/tax-list/tax-list.component';
import { BillFormComponent } from './pages/finances/bills/bill-form/bill-form.component';
import { BillListComponent } from './pages/finances/bills/bill-list/bill-list.component';
import { BillInfoComponent } from './pages/finances/bills/bill-info/bill-info.component';
import { ClientFormComponent } from './pages/clients/clients/client-form/client-form.component';
import { ClientListComponent } from './pages/clients/clients/client-list/client-list.component';
import { ClientInfoComponent } from './pages/clients/clients/client-info/client-info.component';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  { path: '', redirectTo: RoutesConfig.routes.home, pathMatch: 'full' },

  { path: routesNames.home, component: HomeComponent, canActivate: [AuthGuard] },
  { path: routesNames.auth, component: AuthComponent },
  { path: routesNames.error404, component: NotFoundComponent },

  { path: routesNames.finances,  component: FinancesComponent, canActivate: [AuthGuard] },
  { path: routesNames.taxNew,    component: TaxFormComponent,  canActivate: [AuthGuard] },
  { path: routesNames.taxUpdate, component: TaxFormComponent,  canActivate: [AuthGuard] },
  { path: routesNames.taxList,   component: TaxListComponent,  canActivate: [AuthGuard] },
  { path: routesNames.bilNew,    component: BillFormComponent, canActivate: [AuthGuard] },
  { path: routesNames.bilUpdate, component: BillFormComponent, canActivate: [AuthGuard] },
  { path: routesNames.billList,  component: BillListComponent, canActivate: [AuthGuard] },
  { path: routesNames.billInfo,  component: BillInfoComponent, canActivate: [AuthGuard] },

  { path: routesNames.clients,      component: ClientsComponent,    canActivate: [AuthGuard] },
  { path: routesNames.clientNew,    component: ClientFormComponent, canActivate: [AuthGuard] },
  { path: routesNames.clientUpdate, component: ClientFormComponent, canActivate: [AuthGuard] },
  { path: routesNames.clientList,   component: ClientListComponent, canActivate: [AuthGuard] },
  { path: routesNames.clientInfo,   component: ClientInfoComponent, canActivate: [AuthGuard] },

  // otherwise redirect to 404
  { path: '**', redirectTo: RoutesConfig.routes.error404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
