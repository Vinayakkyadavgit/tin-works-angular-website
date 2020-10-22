import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Output() onMenuToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.onMenuToggle.emit();
  }
  onLogout(){

  }

}
