import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {
  invoice_list: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.http.get(this._authService.code).subscribe(res => this.invoice_list = res);
  }

  public add() {
    this.router.navigate(['add-invoice'], { relativeTo: this.route });
  }

  public view(id: any) {
    this.router.navigate(['detail-invoice/' + id], { relativeTo: this.route });
  }

  public delete(id: any) {
    console.log(id);
  }

}
