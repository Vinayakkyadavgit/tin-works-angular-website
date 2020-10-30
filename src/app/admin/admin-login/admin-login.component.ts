import { AuthStore } from '../services/auth.store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthStore, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.email, Validators.required]],
      password: ['123', Validators.required]
    });
  }

  onLoginForm() {
    const loginData = this.loginForm.value;
    this.auth.login(loginData).subscribe(
      () => {
        this.router.navigateByUrl('admin/dashboard');
      },
      error => {
        alert(error);
      }
    );
  }

}
