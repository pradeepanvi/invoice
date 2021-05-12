import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  invoiceForm = this.fb.group({});
  priceBeforeTax: any;
  card_gst: any;
  card_igst: any;

  holder_gst: any;
  holder_igst: any;

  lanyard_gst: any;
  lanyard_igst: any;

  total_tax: any;
  gross_total: any;

  discount_edit = false;
  discount = 0;

  location: any;

  gst_no_edit = true;
  company_status: any;

  admin: any;
  lanyards: any;

  holders: any;

  cards: any;

  locations: any;

  location_edit = false;
  location_edit2 = false;
  location_edit_innter = false;
  location_edit_innter2 = false;

  card_p: any;
  holder_p: any;
  lanyard_p: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.http.get(this._authService.code).subscribe(
      (res) => {
        return this.admin = res;
      }
    )
    this.initForm();
  }

  ngDoCheck() {
    this.checkFormValue();
  }
  ngOnChange() {
    this.checkFormValue();
  }

  private checkFormValue() {
    this.company_status = this.invoiceForm.value.comapny_register;
    if (this.company_status == 'register') {
      this.gst_no_edit = true;
    } else {
      this.gst_no_edit = false;
    }

    this.card_p = this.invoiceForm.value.card.price;
    this.holder_p = this.invoiceForm.value.holder.price;
    this.lanyard_p = this.invoiceForm.value.lanyard.price;

    this.location = this.invoiceForm.value.location.value;
    if (this.location == 'delhi' || this.location == 'yes') {
      if (this.invoiceForm.value.card != '') {
        this.card_gst = ((this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) * 18 / 100) / 2;
      } else {
        this.card_gst = 0;
      }
      this.card_igst = 0;

      if (this.invoiceForm.value.holder != '') {
        this.holder_gst = ((this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) * 18 / 100) / 2;
      } else {
        this.holder_gst = 0;
      }
      this.holder_igst = 0;

      if (this.invoiceForm.value.lanyard != '') {
        this.lanyard_gst = ((this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) * 18 / 100) / 2;
      } else {
        this.lanyard_gst = 0;
      }
      this.lanyard_igst = 0;
      if (this.location == 'delhi') {
        this.location_edit = true;
        this.location_edit2 = false;
        this.location_edit_innter = false;
        this.location_edit_innter2 = false;
      }
      if (this.location == 'yes') {
        this.location_edit = false;
        this.location_edit2 = false;
        this.location_edit_innter = true;
        this.location_edit_innter2 = false;
      }
    } else if (this.location == 'other' || this.location == 'no') {
      this.card_gst = 0;
      if (this.invoiceForm.value.card != '') {
        this.card_igst = (this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) * 18 / 100;
      } else {
        this.card_igst = 0;
      }

      this.holder_gst = 0;
      if (this.invoiceForm.value.holder != '') {
        this.holder_igst = (this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) * 18 / 100;
      } else {
        this.holder_igst = 0;
      }


      this.lanyard_gst = 0;
      if (this.invoiceForm.value.lanyard != '') {
        this.lanyard_igst = (this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) * 18 / 100;
      } else {
        this.lanyard_igst = 0;
      }

      if (this.location == 'other') {
        this.location_edit = false;
        this.location_edit2 = true;
        this.location_edit_innter = false;
        this.location_edit_innter2 = false;
      }
      if (this.location == 'no') {
        this.location_edit = false;
        this.location_edit2 = false;
        this.location_edit_innter = false;
        this.location_edit_innter2 = true;
      }
    }

    this.discount = this.invoiceForm.value.discount;

    if (this.discount > 0) {
      this.discount_edit = true;
    } else {
      this.discount_edit = false;
    }

    this.total_tax = (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_igst + this.holder_igst + this.lanyard_igst);
    //console.log(this.card_gst + this.holder_gst + this.lanyard_gst);

    this.priceBeforeTax = 0;

    if (this.invoiceForm.value.card != '') {
      this.priceBeforeTax += (this.invoiceForm.value.card_q * this.invoiceForm.value.card.price);
    }
    if (this.invoiceForm.value.holder != '') {
      this.priceBeforeTax += (this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price)
    }
    if (this.invoiceForm.value.lanyard != '') {
      this.priceBeforeTax += (this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price);
    }
    this.priceBeforeTax -= this.discount;

    this.gross_total = this.total_tax + this.priceBeforeTax;

  }

  onSubmit() {
    console.log(JSON.stringify(this.invoiceForm.value));
    window.print();
  }

  onCancel() {
    this.router.navigateByUrl('../');
  }

  private initForm() {
    this.invoiceForm = this.fb.group({
      invoice_no: this.fb.control(''),
      company: this.fb.control(''),
      comapny_register: this.fb.control('register'),
      gst_no: this.fb.control(''),
      date: this.fb.control(''),
      card: this.fb.control(''),
      holder: this.fb.control(''),
      lanyard: this.fb.control(''),
      card_s: this.fb.control(1),
      holder_s: this.fb.control(2),
      lanyard_s: this.fb.control(3),
      card_p: this.fb.control(''),
      holder_p: this.fb.control(''),
      lanyard_p: this.fb.control(''),
      card_q: this.fb.control(1),
      holder_q: this.fb.control(1),
      lanyard_q: this.fb.control(1),
      location: this.fb.control('delhi'),
      discount: this.fb.control(0)
    })
  }

}
