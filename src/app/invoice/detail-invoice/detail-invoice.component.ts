import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.scss']
})
export class DetailInvoiceComponent implements OnInit {

  admin: any;
  invoice_list: any;
  id: any;
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

  location_edit = false;
  location_edit2 = false;
  location_edit_innter = false;
  location_edit_innter2 = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkID();
    this.checkAdmin();
    this.checkInvoiceList();
  }

  private checkID() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
  }

  private checkAdmin() {
    this.http.get(this._authService.code).subscribe(
      (res) => {
        this.admin = res;
      }
    )
  }

  private checkInvoiceList() {
    this.http.get(this._authService.code).subscribe(
      (res: any) => {
        this.invoice_list = res.invoice_list[this.id];
        this.company_status = this.invoice_list.comapny_register;
        if (this.company_status == 'register') {
          this.gst_no_edit = true;
        } else {
          this.gst_no_edit = false;
        }

        this.location = this.invoice_list.location.value;
        if (this.location == 'delhi' || this.location == 'yes') {
          this.card_gst = ((this.invoice_list.card_q * this.invoice_list.card.price) * 18 / 100) / 2;
          this.card_igst = 0;

          this.holder_gst = ((this.invoice_list.holder_q * this.invoice_list.holder.price) * 18 / 100) / 2;
          this.holder_igst = 0;

          this.lanyard_gst = ((this.invoice_list.lanyard_q * this.invoice_list.lanyard.price) * 18 / 100) / 2;
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
          this.card_igst = (this.invoice_list.card_q * this.invoice_list.card.price) * 18 / 100;

          this.holder_gst = 0;
          this.holder_igst = (this.invoice_list.holder_q * this.invoice_list.holder.price) * 18 / 100;

          this.lanyard_gst = 0;
          this.lanyard_igst = (this.invoice_list.lanyard_q * this.invoice_list.lanyard.price) * 18 / 100;

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

        this.discount = this.invoice_list.discount;

        if (this.discount > 0) {
          this.discount_edit = true;
        } else {
          this.discount_edit = false;
        }

        this.total_tax = (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_igst + this.holder_igst + this.lanyard_igst);

        this.priceBeforeTax = (this.invoice_list.card_q * this.invoice_list.card.price) + (this.invoice_list.holder_q * this.invoice_list.holder.price) + (this.invoice_list.lanyard_q * this.invoice_list.lanyard.price) - this.discount;

        this.gross_total = this.total_tax + this.priceBeforeTax;

      }

    )
  }

  public back() {
    this.router.navigateByUrl('../../')
  }

}
