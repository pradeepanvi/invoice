import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/shared/global.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  @Input() editMode: any;
  editModeId: any;
  subscription$: Subscription;
  invoiceForm = this.fb.group({});
  formData: any;
  checkCompany: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private _globalService: GlobalService,
  ) {
    this.subscription$ = this._globalService.getFormData().subscribe(res => {
      if (res && this.editMode) {
        this.initForm(res);
      }
    })

  }

  ngOnInit(): void {
    this.formData = this._globalService.adminData;
    this.initForm();
    if (!this.editMode) {
      this._globalService.getInvoices().subscribe((res: any) => {
        if (res && res.length) {
          this._globalService.firebaseInvoiceList = res.length;
        }
      })
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.editModeId = params['id'];
      }
    )
  }

  ngDoCheck() {
    this.onSubmit();
  }

  private initForm(res = {
    invoice_no: '',
    company: '',
    comapny_register: 'register',
    gst_no: '',
    date: '',
    cardGroup: {
      title: '',
      quantity: 1,
      price: 0
    },
    holderGroup: {
      title: '',
      quantity: 1,
      price: 0
    },
    lanyardGroup: {
      title: '',
      quantity: 1,
      price: 0
    },
    location: 'delhi',
    discount: 0
  }) {
    this.invoiceForm = this.fb.group({
      invoice_no: this.fb.control(res.invoice_no),
      company: this.fb.control(res.company),
      comapny_register: this.fb.control(res.comapny_register),
      gst_no: this.fb.control(res.gst_no),
      date: this.fb.control(res.date),
      cardGroup: this.fb.group({
        title: this.fb.control(res.cardGroup.title),
        quantity: this.fb.control(res.cardGroup.quantity),
        price: this.fb.control(res.cardGroup.price),
      }),
      holderGroup: this.fb.group({
        title: this.fb.control(res.holderGroup.title),
        quantity: this.fb.control(res.holderGroup.quantity),
        price: this.fb.control(res.holderGroup.price),
      }),
      lanyardGroup: this.fb.group({
        title: this.fb.control(res.lanyardGroup.title),
        quantity: this.fb.control(res.lanyardGroup.quantity),
        price: this.fb.control(res.lanyardGroup.price),
      }),
      location: this.fb.control(res.location),
      discount: this.fb.control(res.discount)
    })
  }
  onSubmit() {
    this._globalService.sendFormData(this.invoiceForm.value);
  }
  onPrint() {
    window.print();
  }

  onSave() {
    if (this.editMode) {
      this._globalService.saveFormData(this.editModeId, this.invoiceForm.value);
    } else {
      this._globalService.saveFormData(this._globalService.firebaseInvoiceList, this.invoiceForm.value);
      this._globalService.firebaseInvoiceList++;
    }
  }
  onCancel() {
    if (this.editMode) {
      this.router.navigate(['/view-invoice/' + this.editModeId], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
