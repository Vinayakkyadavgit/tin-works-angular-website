import { map, shareReplay, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Banner } from '../model/banner.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerStore {
  private subject = new BehaviorSubject<Banner[]>(null);

  banners$: Observable<Banner[]> = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  getBanner(): Observable<Banner[]> {
    return this.http.get<{ [key: string]: Banner[] }>('/api/banner')
      .pipe(
        map(res => res.payload),
        shareReplay(),
        catchError(error => {
          return throwError(error.error.msg);
        }),
        tap(banners => this.subject.next(banners))
      );
  }

  addBannerData(bannerData): Observable<Banner> {
    return this.http.post<{ [key: string]: Banner }>('/api/banner/add/', bannerData).pipe(
      map(res => res.payload),
      tap(response => {
        const banners = this.subject.getValue();
        const newBannerData: Banner[] = banners.slice();
        newBannerData.push({ ...response });
        this.subject.next(newBannerData);
      }),
      shareReplay(),
      catchError(error => {
        return throwError(error.error.msg);
      })

    );
  }

  editBannerData(bannerData, bannerId: number): Observable<Banner> {
    return this.http.post<{ [key: string]: Banner }>('/api/banner/edit/' + bannerId, bannerData).pipe(
      map(response => response.payload),
      tap(response => {
        const banners = this.subject.getValue();
        const bannerIndex = banners.findIndex(banner => banner.banner_id === bannerId);
        const newBanner: Banner = { ...banners[bannerIndex], ...response };
        const newBanners: Banner[] = banners.slice(0);
        newBanners[bannerIndex] = newBanner;
        this.subject.next(newBanners);
      }),
      shareReplay(),
      catchError(error => {
        return throwError(error.error.msg);
      })
    );
  }

}
