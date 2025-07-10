import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { EntryService } from '../../services/entry.service';
import { NotificationService } from '../../../../shared/components/toast/services/notification.service';
import ProductSelectComponent from '../../../product/components/product-select.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ProductListSelectItem } from '../../../product/models/product-list-select.model';

@Component({
    selector: 'app-edit-entry',
    templateUrl: './insert-edit-entry.component.html',
    imports: [ReactiveFormsModule, CommonModule, ProductSelectComponent],
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
                `,
})
export default class EditInsertEntryComponent {
    uploadProgress: number = 0;
    visible = false;
    fade = false;
    entryForm: FormGroup;
    productItem!: ProductListSelectItem;
    @Output() confirmed = new EventEmitter<void>();
    @ViewChild('selectProduct') ngSelect!: NgSelectComponent;
    constructor(
        private fb: FormBuilder,
        private entryService: EntryService,
        private notificationService: NotificationService
    ) {
        this.entryForm = this.fb.group({
            quantity: [null, Validators.required],
            product: [],
        });
    }

    get productControl(): FormControl {
        return this.entryForm.get('product') as FormControl;
    }

    fillProductForm(id: string) {}

    submitForm() {
        if (this.entryForm.invalid) return;
    }

    show(id?:number) {
        this.visible = true;
        this.fade = true;
        console.log("id"+id);
        

        return this.visible;
    }

    close() {
        setTimeout(() => {
            this.visible = false;
        }, 300);
        this.fade = false;
    }

    confirm() {
        if (this.entryForm.invalid) return;
        const productId = this.entryForm.get('product')?.value;
        const quantity = this.entryForm.get('quantity')?.value;
        console.log(productId);
        
        this.confirmed.emit();
        this.entryService.saveEntry(productId, quantity).subscribe({
            next: (event) => {
                this.notificationService.show({
                    message: 'Category added succesfully',
                    title: 'New category',
                    subtitle: 'added',
                    duration: 3000,
                });
            },
            error: (error) => {
                this.notificationService.show({
                    message: 'Request failed!',
                    title: 'Error',
                    subtitle: 'Category',
                    duration: 3000,
                });
                console.log('Request failed', error);
            },
        });
        this.close();
    }
}
