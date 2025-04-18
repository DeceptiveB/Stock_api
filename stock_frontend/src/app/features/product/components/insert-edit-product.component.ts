import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductRequest } from "../models/product-insert-request.model";
import { ProductService } from "../services/product.service";
import { ImagePreviewProduct } from "../../entry/components/image-preview.component";
import { ActivatedRoute } from "@angular/router";
import ProductListItemComponent from "./product-list-item.component";

@Component(
    {
        selector: "app-edit-entry",
        template: `
        <div class="container py-3">
            <form (ngSubmit)="submitForm()"
            [formGroup]="uploadForm" class="row">
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label class="form-label" for="file">File</label>
                    <input
                    class="form-control"
                    name="image" 
                    type="file"
                    id="file"
                    (change)="onFileSelected($event)"
                    formControlName="image"
                    accept=".jpg,.png">
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label class="form-label" for="file">Name</label>
                    <input
                    class="form-control"
                    name="name" 
                    type="text"
                    formControlName="name"
                    id="name">
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label class="form-label" for="file">Brand</label>
                    <input
                    class="form-control"
                    name="brand" 
                    type="text"
                    formControlName="brand"
                    id="brand">
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label class="form-label" for="file">Description</label>
                    <input
                    class="form-control"
                    name="description" 
                    type="textarea"
                    formControlName="description"
                    id="description">
                </div>
                <button class="btn btn-primary" type="submit">Guardar</button>
            </form>
            <app-product-image-preview 
            [imagePreview]="imagePreview"
            (error)="onImageError()"
            ></app-product-image-preview>
        </div>
        `,
        imports: [ReactiveFormsModule, ImagePreviewProduct],
    }
)

export default class EditInsertProductComponent {
    uploadForm: FormGroup;
    uploadProgress:number = 0;
    selectedFile!: File;
    imagePreview: string | ArrayBuffer | null = null;
    loading = true;

    imageLoadedSuccessfully = true;

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private productService: ProductService){
        this.uploadForm = this.fb.group(
            {
                image: [null, Validators.required],
                name: [null, Validators.required],
                brand: [null, Validators.required],
                description: [null, Validators.required],
            }
        )
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        const id = this.route.snapshot.paramMap.get('productId');
        if(id){
            this.fillProductForm(id);
        }
    }

    submitForm(){
        if (this.uploadForm.invalid) return;

        const productRequest: ProductRequest = {
            image: this.selectedFile,
            name: this.uploadForm.get("name")?.value,
            description: this.uploadForm.get("description")?.value,
            brand: this.uploadForm.get("brand")?.value,
            categories: []
        }

        this.productService.insertProduct(productRequest).subscribe({
            next: (progress) => this.uploadProgress = progress,
            error: (error) => console.log('Request failed', error)
        });
    }

    fillProductForm(id: string){
        this.loading = false;
        this.productService.getProductById(id).subscribe({
            next: (response) => {
                console.log(response)
                const formData = {
                    name: response.name,
                    brand: response.brand,
                    description: response.description
                }
                if(response.image) {
                    this.imagePreview = response.image;
                }
                this.uploadForm.patchValue(formData);
            },
            error: (error) => console.log('Request failed', error)
        });
    }

    onImageError(){
        this.imageLoadedSuccessfully = false;
    }

    onFileSelected(e: Event){
        const fileInput = e.target as HTMLInputElement;
        if(fileInput?.files?.length){
            const file = fileInput.files[0];
            this.selectedFile = file;
            this.uploadForm.patchValue({file})
            const reader = new FileReader();
            reader.onload = () => {
              this.imagePreview = reader.result; // Convert image to Base64 URL
            };
            reader.readAsDataURL(file);
        }
    }
}