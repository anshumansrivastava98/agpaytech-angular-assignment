import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailFormat)]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onLogInClick() {
    this.router.navigateByUrl('/dashboard');
  }
}
