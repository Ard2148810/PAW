import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {User} from '../../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.submitted = false;
    this.error = '';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; } // trzeba sprecyzować typ ale nie wiem jaki :/

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;  // setting true disables login button until response is received
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['']);
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}
