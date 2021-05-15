import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { GlobalService } from 'src/shared/global.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
  id: any;
  hideForm = false;
  editMode = false;
  adminData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _globalService: GlobalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id) {
          this.hideForm = true;
          this._globalService.getInvoice(this.id).subscribe((res: any) => {
            this._globalService.sendFormData(res);
          })
        }
      }
    )
    if (this.route.routeConfig?.path?.includes('edit-invoice')) {
      this.hideForm = false;
      this.editMode = true;
    }
    this._globalService.setAdminDetail();
  }

  // Buttons
  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  onEdit() {
    this.router.navigate(['/edit-invoice/' + this.id], { relativeTo: this.route });
  }
}
