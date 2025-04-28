import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NotificationService } from '../services/notification.service'; // your service

@Injectable()
export class NotificationInterceptor { //implements HttpInterceptor {

    constructor(private notificationService: NotificationService) { }

    //intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //    return next.handle(req).pipe(
    //        tap({
    //            next: (event) => {
    //                if (event instanceof HttpResponse) {
    //                    // Success responses
    //                    if (event.status >= 200 && event.status < 300) {
    //                        this.notificationService.show('Operation successful!', 'success');
    //                    }
    //                }
    //            },
    //            error: (error: HttpErrorResponse) => {
    //                // Error responses
    //                this.notificationService.show('Operation failed.', 'error');
    //            }
    //        })
    //    );
    //}
}