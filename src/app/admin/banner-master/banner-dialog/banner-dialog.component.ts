import { BannerStore } from './../../services/banner.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banner } from '../../model/banner.model';

@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.component.scss']
})
export class BannerDialogComponent implements OnInit {
  dialogTitle: string;
  bannerForm: FormGroup;
  imageLink: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: Banner, private fb: FormBuilder, private bannerStore: BannerStore) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data != null) {
      this.bannerForm = this.fb.group({
        banner_text: [this.data.banner_text],
        banner_text_position: [this.data.banner_text_position],
        banner_image: [''],
        banner_id: [this.data.banner_id]
      });
      this.dialogTitle = 'Edit Banner';
      this.imageLink = this.data.banner_image;
    } else {
      this.bannerForm = this.fb.group({
        banner_text: [''],
        banner_text_position: [''],
        banner_image: ['', Validators.required],
        banner_id: ['']
      });
      this.dialogTitle = 'Add Banner';
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
      this.bannerForm.get('banner_image').patchValue(file);
    }
  }

  onSaveBanner() {
    const formData = new FormData();
    const bannerId = this.bannerForm.get('banner_id').value;
    formData.append('banner_text', this.bannerForm.get('banner_text').value);
    formData.append('banner_text_position', this.bannerForm.get('banner_text_position').value);
    formData.append('banner_image', this.bannerForm.get('banner_image').value);

    if (bannerId) {
      this.bannerStore.editBannerData(formData, +bannerId).subscribe(
        res => alert('Image Uploaded Successfully'),
        err => alert(err)
      );
    } else {
      this.bannerStore.addBannerData(formData).subscribe(
        res => alert('Image Uploaded Successfully'),
        err => alert(err)
      );
    }
  }




}
