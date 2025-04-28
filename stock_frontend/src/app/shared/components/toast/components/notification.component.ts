import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../services/notification.service";
import { CommonModule } from "@angular/common";
import { NotificationData } from "../models/notification.model";

@Component({
    selector: '[app-notification]',
    styles: `
    .toast-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      z-index: 9999;
    }

    .toast-show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .toast-hide {
      opacity: 0;
      transform: translateY(20px);
    }
    `,
    template: `
    <div *ngIf="notification" class="toast-container toast-notification position-fixed bottom-0 end-0 p-3"
    [ngClass]="{
        'toast-show': show,
        'toast-hide': !show}"
        >
        <div id="liveToast" class="d-block toast" role="role" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="..." class="rounded me-2" alt="...">
                <strong class="me-auto">{{ notification.title }}</strong>
                <small>{{notification.subtitle}}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            {{ notification.message }}
            </div>
        </div>
    </div>`,
    imports: [CommonModule]
})

export default class NotificationComponent {
    notification: NotificationData | null = null;
    show = false;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.toast$.subscribe(data => {
            console.log(data.message)
            this.notification = data;
            this.show = true;

            setTimeout(() => {
                this.show = false;
                setTimeout(() => {
                  this.notification = null;
                }, 300); // wait for animation to finish
              }, data.duration || 3000);
        });
    }
}