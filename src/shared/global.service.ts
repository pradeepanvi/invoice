import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  code = "http://localhost:4200/assets/code.json";
  // code = "http://invoice.identitycards.co.in/assets/code.json";

  private subject$ = new Subject<any>();
  constructor(private http: HttpClient) { }

  getAdminDetail() {
    return this.http.get(this.code);
  }

  sendFormData(data: any) {
    this.subject$.next(data);
  }

  getFormData() {
    return this.subject$.asObservable();
  }
}
