import { ProductStore } from './../../services/product.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  dialogTitle: string;
  productForm: FormGroup;
  imageLink: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: Product, private fb: FormBuilder, private productStore: ProductStore) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data != null) {
      this.productForm = this.fb.group({
        product_id: [this.data.product_id],
        product_name: [this.data.product_name],
        product_type: [this.data.product_type],
        product_description: [this.data.product_description],
        product_image: [this.data.product_image],
      });
      this.dialogTitle = 'Edit Product';
    } else {
      this.productForm = this.fb.group({
        product_id: [''],
        product_name: [''],
        product_type: [''],
        product_description: [''],
        product_image: ['', Validators.required],
      });
      this.dialogTitle = 'Add Product';
      this.imageLink = '';
    }
  }

  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageLink = event.target.result;
      }
      this.productForm.get('product_image').patchValue(file);
    }
  }

  onSaveProduct() {
    const formData = new FormData();
    const product_id = this.productForm.get('product_id').value;
    formData.append('product_name', this.productForm.get('product_name').value);
    formData.append('product_type', this.productForm.get('product_type').value);
    formData.append('product_description', this.productForm.get('product_description').value);
    formData.append('product_image', this.productForm.get('product_image').value);

    if (product_id) {
      this.productStore.editProductData(formData, product_id).subscribe(
        res => alert('Image Uploaded Successfully'),
        err => alert(err)
      );
    } else {
      this.productStore.addProductData(formData).subscribe(
        res => alert('Image Uploaded Successfully'),
        err => alert(err)
      );
    }
  }

}

