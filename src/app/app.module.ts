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
import { ClientsService } from './services/clients/clients.service';
import { TaxesService } from './services/taxes/taxes.service';
import { BillsService } from './services/bills/bills.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContainerComponent } from './components/container/container.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { ClientFormComponent } from './pages/clients/clients/client-form/client-form.component';
import { TaxFormComponent } from './pages/finances/taxes/tax-form/tax-form.component';
import { TaxListComponent } from './pages/finances/taxes/tax-list/tax-list.component';
import { ClientListComponent } from './pages/clients/clients/client-list/client-list.component';
import { BillFormComponent } from './pages/finances/bills/bill-form/bill-form.component';
import { BillListComponent } from './pages/finances/bills/bill-list/bill-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogComponent } from './components/dialog/dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { ClientInfoComponent } from './pages/clients/clients/client-info/client-info.component';
import { BillInfoComponent } from './pages/finances/bills/bill-info/bill-info.component';
import { DialogFormPaymentComponent } from './pages/finances/bills/bill-info/dialog-form-payment/dialog-form-payment.component';
import { BillListInfoComponent } from './pages/finances/bills/bill-list/bill-list-info/bill-list-info.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    ContainerComponent,
    NotFoundComponent,
    ClientsComponent,
    FinancesComponent,
    ClientFormComponent,
    TaxFormComponent,
    TaxListComponent,
    ClientListComponent,
    BillFormComponent,
    BillListComponent,
    DialogComponent,
    ClientInfoComponent,
    BillInfoComponent,
    DialogFormPaymentComponent,
    BillListInfoComponent,
    CardComponent,
  ],
  entryComponents: [
    DialogComponent,
    DialogFormPaymentComponent,
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
    FontAwesomeModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ClientsService,
    TaxesService,
    BillsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
