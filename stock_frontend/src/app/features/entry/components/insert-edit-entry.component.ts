import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component(
    {
        selector: "app-edit-entry",
        template: `
        <div>
            <form [formGroup]="uploadForm" 
            (ngSubmit)="submitForm()">
                <div>
                    <label for="file">File</label>
                    <input
                    name="image" 
                    type="file"
                    id="file"
                    (change)="onFileSelected($event)"
                    accept=".jpg,.png">
                </div>
                <div>
                    <label for="file">Name</label>
                    <input
                    name="name" 
                    type="text"
                    id="name">
                </div>
                <div>
                    <label for="file">Brand</label>
                    <input
                    name="brand" 
                    type="text"
                    id="brand">
                </div>
                <div>
                    <label for="file">Description</label>
                    <input
                    name="description" 
                    type="textarea"
                    id="description">
                </div>
                <input type="submit">
            </form>
        </div>
        `,
        imports: [ReactiveFormsModule],
    }
)

export default class EditInsertEntryComponent {
    uploadForm: FormGroup;
    uploadProgress:number = 0;
    constructor(private fb: FormBuilder){
        this.uploadForm = this.fb.group(
            {
                file: [null, Validators.required]
            }
        )
    }

    submitForm(){
        if (this.uploadForm.invalid) return;
    }

    onFileSelected(e: Event){
        const fileInput = e.target as HTMLInputElement;
        if(fileInput?.files?.length){
            const file = fileInput.files[0];
            this.uploadForm.patchValue({file})
        }
    }
}