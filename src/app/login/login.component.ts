import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({});
  constructor(private fb: FormBuilder, private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      user: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }

  onSubmit() {
    this._authService.login(this.loginForm.value.user, this.loginForm.value.password);
    this.router.navigateByUrl('invoice');
  }

}
