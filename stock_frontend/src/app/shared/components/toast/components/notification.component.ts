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
      animation-name: fadeInOut;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      z-index: 9999;
    }

    @keyframes fadeInOut {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      10% {
        opacity: 1;
        transform: translateY(0);
      }
      90% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
    `,
    template: `
    <div *ngIf="notification" class="toast-notification position-fixed bottom-0 end-0 p-3"
        [ngStyle]="{ animationDuration: (duration + 500) + 'ms' }"
        >
        <div id="liveToast"
         class="d-block toast" 
         role="role" aria-live="assertive" aria-atomic="true">
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
    duration = 3000;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.toast$.subscribe(data => {
            console.log(data.message)
            this.notification = data;
            this.duration = data.duration || 3000;
            this.show = true;

            setTimeout(() => {
                this.show = false;
                setTimeout(() => {
                    this.notification = null;
                }, 500); // wait for animation to finish
            }, data.duration || 3000);
        });
    }
}