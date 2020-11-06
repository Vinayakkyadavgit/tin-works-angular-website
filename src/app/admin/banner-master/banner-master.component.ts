import { MatPaginator } from '@angular/material/paginator';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { Banner } from './../model/banner.model';
import { BannerStore } from '../services/banner.store';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-banner-master',
  templateUrl: './banner-master.component.html',
  styleUrls: ['./banner-master.component.scss']
})
export class BannerMasterComponent implements OnInit, AfterViewInit {

  displayedColumns = ['banner_id', 'banner_image', 'banner_text', 'banner_text_position', 'add_date', 'edit'];
  bannerDataSource = new MatTableDataSource<Banner>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private bannerStore: BannerStore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bannerStore.getBanner().subscribe(res => {
      this.bannerDataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.bannerDataSource.sort = this.sort;
    this.bannerDataSource.paginator = this.paginator;
  }



  onEditBanner(bannerData: Banner) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';
    dialogConfig.data = { bannerData };
    const dialogRef = this.dialog.open(BannerDialogComponent, dialogConfig);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.refresh();
      }
    });
  }

  onAddBanner() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(BannerDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.refresh();
      }
    });
  }


  refresh() {
    this.bannerStore.getBanner().subscribe(res => {
      this.bannerDataSource.data = res;
    });
  }
}
