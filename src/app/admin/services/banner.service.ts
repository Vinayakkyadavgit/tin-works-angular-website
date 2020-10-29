import { Banner } from './../model/banner.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banner: Banner[] = [
    {
      banner_id: 1,
      banner_image: "http://localhost/steel/assets/images/banners/banner1.jpg",
      banner_text: "abc",
      banner_text_position: "center",
      add_date: new Date("2020-10-18 21:25:06")

    },
    {
      banner_id: 2,
      banner_image: "http://localhost/steel/assets/images/banners/banner2.jpg",
      banner_text: "lorem Ipsum",
      banner_text_position: "center",
      add_date: new Date("2020-10-19 21:25:06")

    },
    {
      banner_id: 3,
      banner_image: "http://localhost/steel/assets/images/banners/banner3.jpg",
      banner_text: "Hussya",
      banner_text_position: "center",
      add_date: new Date("2020-10-17 21:25:06")
    }
  ];

  constructor() { }

  getBanner() {
    return this.banner.slice();
  }
}
