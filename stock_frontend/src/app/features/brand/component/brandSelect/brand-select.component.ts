import { Component, Input, SimpleChanges } from "@angular/core";
import {NgLabelTemplateDirective, NgOptionComponent, NgOptionTemplateDirective, NgSelectComponent} from "@ng-select/ng-select";
import { BrandListItem } from "../../models/brand-list-item.model";
import { BrandService } from "../../service/brand.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-brand-select",
    templateUrl: './brand-select.component.html',
    imports: [
        NgSelectComponent, ReactiveFormsModule]
})

export default class BrandSelectComponent {
    @Input() brandItem!: BrandListItem;
    @Input() control!: FormControl;
    brandList!: BrandListItem[];
    constructor(private brandService: BrandService){}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['brandItem'] && this.brandItem) {
            console.log(this.brandItem)
            this.brandList = [this.brandItem]
            this.control.setValue(this.brandItem.name);
        }
    }

    changeBrands(event: {term: string;items: any[]}): void {
        const brandName = event.term;
        if(brandName.length > 1) {
            this.brandService.getBrandsByName(brandName).subscribe({
                next: (response) => {
                    console.log(response)
                    this.brandList = response
                },
                error: (error) => console.log('Request failed', error)
            });
        }
    }

    selectItem(item: BrandListItem):void {
        this.control.setValue(item.name);
    }
}