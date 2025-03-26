import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component(
    {
        selector: "app-edit-entry",
        template: `
        <div>
            <form (ngSubmit)="submitForm()">
                <div>
                    <label for="file">File</label>
                    <input 
                    type="file"
                    id="file"
                    (change)="onFileSelected($event)"
                    accept=".jpg,.png">
                </div>
            </form>
        </div>
        `,
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

    }

    onFileSelected(e: Event){
        const fileInput = e.target as HTMLInputElement;
        if(fileInput?.files?.length){
            const file = fileInput.files[0];
            this.uploadForm.patchValue({file})
        }
    }
}