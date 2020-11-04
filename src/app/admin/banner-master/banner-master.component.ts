import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { Banner } from './../model/banner.model';
import { BannerStore } from '../services/banner.store';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-banner-master',
  templateUrl: './banner-master.component.html',
  styleUrls: ['./banner-master.component.scss']
})
export class BannerMasterComponent implements OnInit {

  displayedColumns = ['banner_id', 'banner_image', 'banner_text', 'banner_text_position', 'add_date', 'edit'];
  bannerDataSource = new MatTableDataSource<Banner>();

  constructor(private bannerStore: BannerStore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bannerStore.getBanner().subscribe(res => {
      this.bannerDataSource.data = res;
    });
  }

  onEditBanner(bannerData: Banner) {
    const dialogRef = this.dialog.open(BannerDialogComponent, {
      data: { bannerData },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  onAddBanner() {
    const dialogRef = this.dialog.open(BannerDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(res => {
      this.refresh();
    });
  }


  refresh() {
    this.bannerStore.getBanner().subscribe(res  => {
      this.bannerDataSource.data = res;
    });
  }
}
