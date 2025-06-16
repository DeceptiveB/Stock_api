import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { NotificationService } from "../../../../shared/components/toast/services/notification.service";
import { HttpEventType } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
	selector: 'app-category-insert-model',
	templateUrl: './category-insert.component.html',
})
export default class CategoryInsertModalComponent {
	visible = false;
	fade = false;
	brandForm: FormGroup;
	@Output() confirmed = new EventEmitter<void>();

	constructor(
		private categoryService: CategoryService,
		private notificationService: NotificationService,
		private fb: FormBuilder
	) {
		this.brandForm = this.fb.group({
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
		if (this.brandForm.invalid) return;
		const categoryName = this.brandForm.get('name')?.value;
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
