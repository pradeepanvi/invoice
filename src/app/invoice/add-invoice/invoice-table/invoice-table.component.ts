import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/shared/global.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})
export class InvoiceTableComponent implements OnInit {
  @Input() detailView: any;
  @Output() newBack = new EventEmitter<any>();
  @Output() newEdit = new EventEmitter<any>();
  admin: any;
  invoiceData: any;
  priceBeforeTax: any;
  total_tax = 0
  gross_total = 0;
  subscription$: Subscription;
  adminSubscription$: Subscription;

  //GST
  card_gst = 0;
  holder_gst = 0;
  lanyard_gst = 0;

  //IGST
  card_igst = 0;
  holder_igst = 0;
  lanyard_igst = 0;

  //locations
  location_edit = false;
  location_edit2 = false;
  location_edit_innter = false;
  location_edit_innter2 = false;

  constructor(
    private _globalService: GlobalService
  ) {
    this.subscription$ = this._globalService.getFormData().subscribe(res => {
      if (res) {
        this.invoiceData = res;
        this.calculateTableData();
      }
    })
    this.adminSubscription$ = this._globalService.getAdminDetail().subscribe(res => {
      if (res) {
        this.admin = res;
      }
    })
  }

  ngOnInit(): void {
    // console.log(this.detailView);
  }

  private calculateTableData() {
    this.getPriceBeforeTax();
    this.getLocation();
    this.setTotal();
  }

  private getPriceBeforeTax() {
    this.priceBeforeTax = 0;
    const cardGroup = this.invoiceData.cardGroup;
    const holderGroup = this.invoiceData.holderGroup;
    const lanyardGroup = this.invoiceData.lanyardGroup;
    if (cardGroup != '') {
      this.priceBeforeTax += (cardGroup.quantity * cardGroup.price);
    }
    if (holderGroup != '') {
      this.priceBeforeTax += (holderGroup.quantity * holderGroup.price)
    }
    if (lanyardGroup != '') {
      this.priceBeforeTax += (lanyardGroup.quantity * lanyardGroup.price);
    }
    this.priceBeforeTax -= this.invoiceData.discount;
  }

  private getLocation() {
    const location = this.invoiceData.location.value;
    if (location == 'delhi' || location == 'yes') {
      this.card_gst = this.getGST(this.invoiceData.cardGroup);
      this.holder_gst = this.getGST(this.invoiceData.holderGroup);
      this.lanyard_gst = this.getGST(this.invoiceData.lanyardGroup);

      if (location == 'delhi') {
        this.location_edit = true;
        this.location_edit2 = false;
        this.location_edit_innter = false;
        this.location_edit_innter2 = false;
      }
      if (location == 'yes') {
        this.location_edit = false;
        this.location_edit2 = false;
        this.location_edit_innter = true;
        this.location_edit_innter2 = false;
      }
    } else if (location == 'other' || location == 'no') {
      this.card_igst = this.getIGST(this.invoiceData.cardGroup);
      this.holder_igst = this.getIGST(this.invoiceData.holderGroup);
      this.lanyard_igst = this.getIGST(this.invoiceData.lanyardGroup);
      if (location == 'other') {
        this.location_edit = false;
        this.location_edit2 = true;
        this.location_edit_innter = false;
        this.location_edit_innter2 = false;
      }
      if (location == 'no') {
        this.location_edit = false;
        this.location_edit2 = false;
        this.location_edit_innter = false;
        this.location_edit_innter2 = true;
      }
    }
  }

  private getGST(product: any) {
    if (product != '') {
      return (product.quantity * product.price) * (9 / 100);
    } else {
      return 0;
    }
  }

  private getIGST(product: any) {
    if (product != '') {
      return (product.quantity * product.price) * (18 / 100);
    } else {
      return 0;
    }
  }

  private setTotal() {
    this.total_tax = (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_igst + this.holder_igst + this.lanyard_igst);
    this.gross_total = this.total_tax + this.priceBeforeTax;
  }

  //Buttons
  onBack() {
    this.newBack.emit();
  }
  onEdit() {
    this.newEdit.emit();
  }
}
