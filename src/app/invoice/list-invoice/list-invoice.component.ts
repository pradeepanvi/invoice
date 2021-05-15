import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/shared/global.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {
  invoice_list: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this._globalService.getInvoices().subscribe(res => {
      this.invoice_list = res;
      console.log(res);
    })
  }

  public add() {
    this.router.navigate(['add-invoice'], { relativeTo: this.route });
  }

  public view(id: any) {
    this.router.navigate(['view-invoice/' + id], { relativeTo: this.route });
  }

  public delete(id: any) {
    this.invoice_list.splice(id, 1);
    this._globalService.deleteInvoice(this.invoice_list);
  }

}
