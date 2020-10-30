import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminLoginComponent } from './admin-login.component';


@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminLoginComponent
  ]
})
export class LoginModule { }
