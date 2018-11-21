import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(res => {
            console.log(res);
            if (res.status === 401 && res.error.action !== 'login') {
                // auto logout if 401 response returned from api and action is not login
                this.authService.logout();
                location.reload(true);
            } else if (res.status === 401 && res.error.action === 'login') {
                this.notificationService.error(res.error.message);
            }

            const error = res.error.message || res.statusText;
            return throwError(error);
        }));
    }
}
