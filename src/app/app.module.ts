import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';

import { AuthGuard } from './services/user/auth.guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component'
import { AuthService } from './services/user/auth.service';
import { UserService } from './services/user/user.service';
import { ProjectsService } from './services/projects/projects.service';
import { ContactsService } from './services/contacts/contacts.service';
import { TaxesService } from './services/taxes/taxes.service';
import { BillsService } from './services/bills/bills.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContainerComponent } from './components/container/container.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { ContactFormComponent } from './pages/contacts/contacts/contact-form/contact-form.component';
import { TaxFormComponent } from './pages/finances/taxes/tax-form/tax-form.component';
import { TaxListComponent } from './pages/finances/taxes/tax-list/tax-list.component';
import { ClientsListComponent } from './pages/contacts/contacts/clients-list/clients-list.component';
import { BillFormComponent } from './pages/finances/bills/bill-form/bill-form.component';
import { BillListComponent } from './pages/finances/bills/bill-list/bill-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogComponent } from './components/dialog/dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { ContactInfoComponent } from './pages/contacts/contacts/contact-info/contact-info.component';
import { BillInfoComponent } from './pages/finances/bills/bill-info/bill-info.component';
import { DialogFormPaymentComponent } from './pages/finances/bills/bill-info/dialog-form-payment/dialog-form-payment.component';
import { BillListInfoComponent } from './pages/finances/bills/bill-list/bill-list-info/bill-list-info.component';
import { CardComponent } from './components/card/card.component';
import { ContactsListComponent } from './pages/contacts/contacts/contacts-list/contacts-list.component';
import { ContactsRegularListComponent } from './pages/contacts/contacts/contacts-regular-list/contacts-regular-list.component';
import { DialogFormPersonComponent } from './pages/contacts/contacts/contact-info/dialog-form-person/dialog-form-person.component';
import { ProjectsListComponent } from './pages/contacts/projects/projects-list/projects-list.component';
import { ProjectsFormComponent } from './pages/contacts/projects/projects-form/projects-form.component';
import { ProjectsInfoComponent } from './pages/contacts/projects/projects-info/projects-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    ContainerComponent,
    NotFoundComponent,
    ContactsComponent,
    FinancesComponent,
    ContactFormComponent,
    TaxFormComponent,
    TaxListComponent,
    ClientsListComponent,
    BillFormComponent,
    BillListComponent,
    DialogComponent,
    ContactInfoComponent,
    BillInfoComponent,
    DialogFormPaymentComponent,
    BillListInfoComponent,
    CardComponent,
    ContactsListComponent,
    ContactsRegularListComponent,
    DialogFormPersonComponent,
    ProjectsListComponent,
    ProjectsFormComponent,
    ProjectsInfoComponent,
  ],
  entryComponents: [
    DialogComponent,
    DialogFormPaymentComponent,
    DialogFormPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ContactsService,
    TaxesService,
    BillsService,
    ProjectsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
