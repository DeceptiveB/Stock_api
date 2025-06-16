import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { BrandService } from "../../service/brand.service";
import { NotificationService } from "../../../../shared/components/toast/services/notification.service";
import { HttpEventType } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component(
    {
        selector: 'app-brand-insert',
        templateUrl: './brand-insert.component.html',
        imports: [CommonModule, ReactiveFormsModule],
        styles: `
            .modal-fade-in {
                animation: fadeIn 0.3s ease-in;
            }
            .modal-fade-out {
                animation: fadeOut 0.3s ease-out;
                opacity: 0;
            }

            @keyframes fadeIn {
                from { opacity: 0 }
                to { opacity: 1 }
            }

            @keyframes fadeOut {
                from { opacity: 1 }
                to { opacity: 0}
            }
        `
    }
)

export default class BrandInsertComponent {
    visible = false;
    fade = false;
    brandForm: FormGroup;
    @Output() confirmed = new EventEmitter<void>();

    constructor(private brandService: BrandService,
        private notificationService: NotificationService,
        private fb: FormBuilder
    ) {
        this.brandForm = this.fb.group(
            {
                name: [null, [Validators.required]],
            }
        );
    }

    show() {
        this.visible = true;
        this.fade = true
        return this.visible;
    }

    close() {
        setTimeout(() => {
            this.visible = false;
        }, 300);
        this.fade = false
    }

    confirm() {
        if (this.brandForm.invalid) return;
        const brandName = this.brandForm.get("name")?.value
        this.confirmed.emit();
        this.brandService.saveBrand(brandName).subscribe({
            next: (event) => {
                this.notificationService.show({
                    message: 'Brand added succesfully',
                    title: "New brand",
                    subtitle: "added",
                    duration: 3000
                });
            },
            error: (error) => {
                this.notificationService.show({
                    message: "Request failed!",
                    title: "Error",
                    subtitle: "Brand",
                    duration: 3000
                });
                console.log('Request failed', error)
            }
        });
        this.close();
    }
}