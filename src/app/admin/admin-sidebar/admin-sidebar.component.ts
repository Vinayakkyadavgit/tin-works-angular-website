import { AuthStore } from './../services/auth.store';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  @Output() sideNavClick = new EventEmitter<void>();
  constructor(public auth: AuthStore) { }

  ngOnInit(): void {
  }

  onSideNavClick() {
    this.sideNavClick.emit();
  }
  onLogout() {
    this.sideNavClick.emit();
    this.auth.logout();
  }

}
