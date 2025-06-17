import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../../../shared/components/toast/services/notification.service';
import { HttpEventType } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-category-insert',
  templateUrl: './category-insert.component.html',
  imports: [ReactiveFormsModule, CommonModule],
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
export default class CategoryInsertModalComponent {
  visible = false;
  fade = false;
  categoryForm: FormGroup;
  @Output() confirmed = new EventEmitter<void>();

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  show() {
    this.visible = true;
    this.fade = true;
    return this.visible;
  }

  close() {
    setTimeout(() => {
      this.visible = false;
    }, 300);
    this.fade = false;
  }

  confirm() {
    if (this.categoryForm.invalid) return;
    const categoryName = this.categoryForm.get('name')?.value;
    this.confirmed.emit();
    this.categoryService.saveCategory(categoryName).subscribe({
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
