import { map, shareReplay, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Banner } from '../model/banner.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerStore {
  private subject = new BehaviorSubject<Banner>(null);

  banners$: Observable<Banner> = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  getBanner(): Observable<Banner[]> {
    return this.http.get<{ [key: string]: Banner[] }>('/api/banner')
      .pipe(
        tap(response => console.log(response)),
        map(res => res.payload),
        shareReplay(),
        catchError(error => {
          return throwError(error.error.msg);
        })
      );
    // return this.banner.slice();
  }
}
