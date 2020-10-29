import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  callMe(){
      this.http.get( '/api/getData').subscribe(data => console.log(data));
  }

}
