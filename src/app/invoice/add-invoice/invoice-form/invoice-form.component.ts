import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/shared/global.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm = this.fb.group({});
  formData: any;
  checkCompany: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

    private _globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._globalService.getAdminDetail().subscribe(res => this.formData = res);
  }

  ngDoCheck() {
    this.onSubmit();
  }

  private initForm() {
    this.invoiceForm = this.fb.group({
      invoice_no: this.fb.control(''),
      company: this.fb.control(''),
      comapny_register: this.fb.control('register'),
      gst_no: this.fb.control(''),
      date: this.fb.control(''),
      cardGroup: this.fb.group({
        title: this.fb.control(''),
        quantity: this.fb.control(1),
        price: this.fb.control(0),
      }),
      holderGroup: this.fb.group({
        title: this.fb.control(''),
        quantity: this.fb.control(1),
        price: this.fb.control(0),
      }),
      lanyardGroup: this.fb.group({
        title: this.fb.control(''),
        quantity: this.fb.control(1),
        price: this.fb.control(0),
      }),
      location: this.fb.control('delhi'),
      discount: this.fb.control(0)
    })
  }
  onSubmit() {
    this._globalService.sendFormData(this.invoiceForm.value);
  }
  onPrint() {
    window.print();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
