import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Banner } from '../model/banner.model';
import { BannerStore } from '../services/banner.store';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  displayedColumns = ['banner_id', 'banner_image', 'banner_text', 'banner_text_position', 'add_date', 'edit'];
  bannerDataSource = new MatTableDataSource<Banner>();

  
  constructor(private bannerStore : BannerStore) { }

  ngOnInit(): void {
    this.bannerStore.getBanner().subscribe(res => {
      this.bannerDataSource.data = res;
    });
  }

}
