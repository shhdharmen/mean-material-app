import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiUrlService } from '../api-url/api-url.service';
import * as moment from 'moment';
import { CoreModule } from '../../core.module';
import { IAuthResult } from '../../models/auth';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: CoreModule })
export class AuthService {
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService, private localStorage: LocalStorageService) { }

  login(username: string, password: string) {
    return this.http.post<IAuthResult>(`${this.apiUrlService.API_URL}/auth/login/`, { username, password });
  }

  logout() {
    // remove user from local storage to log user out
    this.localStorage.removeItem('currentUser');
    this.localStorage.removeItem('id_token');
    this.localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  getExpiration() {
    const expiration = this.localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
