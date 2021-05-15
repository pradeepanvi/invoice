import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  code = "http://localhost:4200/assets/code.json";
  // code = "http://invoice.identitycards.co.in/assets/code.json";

  adminData: any;
  firebaseAdmin = "https://creation-invoice-default-rtdb.firebaseio.com/admin";
  firebaseInvoice = "https://creation-invoice-default-rtdb.firebaseio.com/invoices";
  firebaseInvoiceList = 0;
  private subject$ = new Subject<any>();
  private adminData$ = new Subject<any>();
  constructor(private http: HttpClient) { }

  sendFormData(data: any) {
    this.subject$.next(data);
  }

  getFormData() {
    return this.subject$.asObservable();
  }

  saveFormData(id: any, formData: any) {
    return this.http.put(`${this.firebaseInvoice}/${id}.json`, formData).subscribe(res => console.log(res));
  }

  getInvoices() {
    return this.http.get(`${this.firebaseInvoice}.json`);
  }

  getInvoice(id: any) {
    return this.http.get(`${this.firebaseInvoice}/${id}.json`);
  }
  setAdminDetail() {
    return this.http.get(`${this.firebaseAdmin}.json`).subscribe(res => this.adminData$.next(res));
  }

  getAdminDetail() {
    return this.adminData$.asObservable();
  }
}
