import { map, shareReplay, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  private subject = new BehaviorSubject<Product[]>(null);
  products$: Observable<Product[]> = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<{ [key: string]: Product[] }>('/api/product')
      .pipe(
        map(res => res.payload),
        shareReplay(),
        catchError(error => {
          return throwError(error.error.msg);
        }),
        tap(products => this.subject.next(products))
      );
  }

  addProductData(productData): Observable<Product> {
    return this.http.post<{ [key: string]: Product }>('/api/product/add/', productData).pipe(
      map(res => res.payload),
      tap(response => {
        const products = this.subject.getValue();
        const newProductData: Product[] = products.slice();
        newProductData.push({ ...response });
        this.subject.next(newProductData);
      }),
      shareReplay(),
      catchError(error => {
        return throwError(error.error.msg);
      })

    );
  }

  editProductData(productData, productId: number): Observable<Product> {
    return this.http.post<any>('/api/product/edit/' + productId, productData).pipe(
      tap(response => console.log(response)),
      shareReplay(),
      catchError(error => {
        return throwError(error.error.msg);
      })
    );
  }

}
