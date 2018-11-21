import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, LocalStorageService } from '@appcore/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@appcore';
import { Subscription } from 'rxjs';
import { IAuthResult } from '@app/_core/models/auth';
import * as moment from 'moment';

@Component({
  selector: 'mma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });
  returnUrl: string;
  submitted: boolean;
  loading: boolean;
  error = '';
  loginSubscriber: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginSubscriber = this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        resp => {
          this.loading = false;
          this.setSession(resp);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  private setSession(authResult: IAuthResult) {
    this.localStorage.setItem('currentUser', authResult.user);
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    this.localStorage.setItem('id_token', authResult.idToken);
    this.localStorage.setItem('expires_at', expiresAt);
  }

  ngOnDestroy(): void {
    this.loginSubscriber.unsubscribe();
  }
}
