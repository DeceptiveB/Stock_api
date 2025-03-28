import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductRequest } from "../models/product-insert-request.model";
import { ProductService } from "../services/product.service";

@Component(
    {
        selector: "app-edit-entry",
        template: `
        <div>
            <form (ngSubmit)="submitForm()">
                <div>
                    <label for="file">File</label>
                    <input
                    name="image" 
                    type="file"
                    id="file"
                    (change)="onFileSelected($event)"
                    formControlName="image"
                    accept=".jpg,.png">
                </div>
                <div>
                    <label for="file">Name</label>
                    <input
                    name="name" 
                    type="text"
                    formControlName="name"
                    id="name">
                </div>
                <div>
                    <label for="file">Brand</label>
                    <input
                    name="brand" 
                    type="text"
                    formControlName="brand"
                    id="brand">
                </div>
                <div>
                    <label for="file">Description</label>
                    <input
                    name="description" 
                    type="textarea"
                    formControlName="description"
                    id="description">
                </div>
                <input type="submit">
            </form>
        </div>
        `,
    }
)

export default class EditInsertEntryComponent {
    uploadForm: FormGroup;
    uploadProgress:number = 0;
    constructor(private fb: FormBuilder, private productService: ProductService){
        this.uploadForm = this.fb.group(
            {
                image: [null, Validators.required],
                name: [null, Validators.required],
                brand: [null, Validators.required],
                description: [null, Validators.required],
            }
        )
    }

    submitForm(){
        if (this.uploadForm.invalid) return;

        const productRequest: ProductRequest = {
            image: this.uploadForm.get("image")?.value,
            name: this.uploadForm.get("name")?.value,
            description: this.uploadForm.get("description")?.value,
            brand: this.uploadForm.get("brand")?.value,
        }

        this.productService.insertProduct(productRequest).subscribe({
            next: (progress) => this.uploadProgress = progress,
            error: (error) => console.log('Request failed', error)
        });

    }

    onFileSelected(e: Event){
        const fileInput = e.target as HTMLInputElement;
        if(fileInput?.files?.length){
            const file = fileInput.files[0];
            this.uploadForm.patchValue({file})
        }
    }
}