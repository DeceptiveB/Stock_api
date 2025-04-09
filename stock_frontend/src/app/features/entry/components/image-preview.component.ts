import { CommonModule, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-product-image-preview',
    template: `
    <div class="mt-2 text-center">
        <img class="image-preview" *ngIf="imagePreview" src="{{imagePreview}}" alt="">
    </div>
    `,
    styles: `
        .image-preview {
            height: 200px
        }
    `,
    imports: [CommonModule]
})

export class ImagePreviewProduct {
    @Input() imagePreview: string | ArrayBuffer | null = null;
}