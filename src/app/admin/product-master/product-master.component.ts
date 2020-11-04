import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductStore } from '../services/product.store';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  displayedColumns = ['product_id', 'product_name', 'product_type', 'product_description', 'product_image', 'add_date','edit'];
  productDataSource = new MatTableDataSource<Product>();

  
  constructor(private productStore : ProductStore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productStore.getProduct().subscribe(res => {
      this.productDataSource.data = res;
    });
  }

  onAddProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(res => {
      this.refresh();
    });
  }

  onEditProduct(productData: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data : productData ,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  refresh() {
    this.productStore.getProduct().subscribe(res  => {
      this.productDataSource.data = res;
    });
  }

}
