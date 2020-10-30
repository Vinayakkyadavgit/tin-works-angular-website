import { map } from 'rxjs/operators';
import { AuthStore } from '../services/auth.store';
import { Observable } from 'rxjs';
import {  ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/Router'


@Injectable({ providedIn: 'root' })

export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthStore, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['admin/login']);
        }

      }))
  }
}
