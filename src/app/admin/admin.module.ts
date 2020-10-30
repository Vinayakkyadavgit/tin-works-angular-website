import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { BannerMasterComponent } from './banner-master/banner-master.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

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
  ],
  providers : [{ 
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true 
               }
   ]
})
export class AdminModule { }
