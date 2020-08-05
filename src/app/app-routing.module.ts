import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './configs/routes.configs';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './services/user/auth.guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { TaxFormComponent } from './pages/finances/taxes/tax-form/tax-form.component';
import { TaxListComponent } from './pages/finances/taxes/tax-list/tax-list.component';
import { BillFormComponent } from './pages/finances/bills/bill-form/bill-form.component';
import { BillListComponent } from './pages/finances/bills/bill-list/bill-list.component';
import { BillInfoComponent } from './pages/finances/bills/bill-info/bill-info.component';
import { ContactFormComponent } from './pages/contacts/contacts/contact-form/contact-form.component';
import { ContactsListComponent } from './pages/contacts/contacts/contacts-list/contacts-list.component';
import { ContactInfoComponent } from './pages/contacts/contacts/contact-info/contact-info.component';
import { ClientsListComponent } from './pages/contacts/contacts/clients-list/clients-list.component';
import { ContactsRegularListComponent } from './pages/contacts/contacts/contacts-regular-list/contacts-regular-list.component';
import { ProjectsFormComponent } from './pages/contacts/projects/projects-form/projects-form.component';
import { ProjectsInfoComponent } from './pages/contacts/projects/projects-info/projects-info.component';
import { ProjectsListComponent } from './pages/contacts/projects/projects-list/projects-list.component';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  { path: '', redirectTo: RoutesConfig.routes.home, pathMatch: 'full' },

  { path: routesNames.home, component: HomeComponent, canActivate: [AuthGuard] },
  { path: routesNames.auth, component: AuthComponent },
  { path: routesNames.error404, component: NotFoundComponent },

  { path: routesNames.finances,   component: FinancesComponent, canActivate: [AuthGuard] },
    { path: routesNames.taxNew,     component: TaxFormComponent,  canActivate: [AuthGuard] },
    { path: routesNames.taxUpdate,  component: TaxFormComponent,  canActivate: [AuthGuard] },
    { path: routesNames.taxList,    component: TaxListComponent,  canActivate: [AuthGuard] },
    { path: routesNames.billNew,    component: BillFormComponent, canActivate: [AuthGuard] },
    { path: routesNames.billUpdate, component: BillFormComponent, canActivate: [AuthGuard] },
    { path: routesNames.billList,   component: BillListComponent, canActivate: [AuthGuard] },
    { path: routesNames.billInfo,   component: BillInfoComponent, canActivate: [AuthGuard] },

  { path: routesNames.contacts,              component: ContactsComponent,            canActivate: [AuthGuard] },
    { path: routesNames.contactsNew,         component: ContactFormComponent,         canActivate: [AuthGuard] },
    { path: routesNames.contactsUpdate,      component: ContactFormComponent,         canActivate: [AuthGuard] },
    { path: routesNames.contactsInfo,        component: ContactInfoComponent,         canActivate: [AuthGuard] },
    { path: routesNames.contactsList,        component: ContactsListComponent,        canActivate: [AuthGuard] },
    { path: routesNames.contactsClientsList, component: ClientsListComponent,         canActivate: [AuthGuard] },
    { path: routesNames.contactsRegularList, component: ContactsRegularListComponent, canActivate: [AuthGuard] },

    { path: routesNames.projectsNew,    component: ProjectsFormComponent, canActivate: [AuthGuard] },
    { path: routesNames.projectsUpdate, component: ProjectsFormComponent, canActivate: [AuthGuard] },
    { path: routesNames.projectsInfo,   component: ProjectsInfoComponent, canActivate: [AuthGuard] },
    { path: routesNames.projectsList,   component: ProjectsListComponent, canActivate: [AuthGuard] },

  // otherwise redirect to 404
  { path: '**', redirectTo: RoutesConfig.routes.error404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
