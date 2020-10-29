import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerMasterComponent } from './banner-master/banner-master.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    DashboardComponent,
    BannerMasterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
