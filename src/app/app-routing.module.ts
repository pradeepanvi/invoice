import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  {
    path: '', component: InvoiceComponent, children: [
      { path: '', component: ListInvoiceComponent },
      { path: 'add-invoice', component: AddInvoiceComponent },
      { path: 'view-invoice/:id', component: AddInvoiceComponent },
      { path: 'edit-invoice/:id', component: AddInvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
