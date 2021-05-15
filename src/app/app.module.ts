import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { InvoiceFormComponent } from './invoice/add-invoice/invoice-form/invoice-form.component';
import { InvoiceTableComponent } from './invoice/add-invoice/invoice-table/invoice-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InvoiceComponent,
    ListInvoiceComponent,
    AddInvoiceComponent,
    InvoiceFormComponent,
    InvoiceTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
