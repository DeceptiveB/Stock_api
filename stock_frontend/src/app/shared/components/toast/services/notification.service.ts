import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastSubject = new Subject<NotificationData>();
  toast$ = this.toastSubject.asObservable();

  show(data: NotificationData) {
    this.toastSubject.next(data);
  }
}