import { Banner } from './../model/banner.model';
import { BannerService } from './../services/banner.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-banner-master',
  templateUrl: './banner-master.component.html',
  styleUrls: ['./banner-master.component.scss']
})
export class BannerMasterComponent implements OnInit {

  displayedColumns = ['banner_id', 'banner_image', 'banner_text', 'banner_text_position', 'add_date', 'edit'];
  bannerDataSource = new MatTableDataSource<Banner>();

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.bannerDataSource.data = this.bannerService.getBanner();
  }

}