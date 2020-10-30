import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo : 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
    children: [{
      path: '',
      loadChildren: ()=> import('./admin-login/admin-login.module').then(m=>m.LoginModule)
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
