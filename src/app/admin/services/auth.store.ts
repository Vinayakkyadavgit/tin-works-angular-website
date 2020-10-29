import { Router } from '@angular/router';
import { UserData } from './../model/userData';
import { Login } from './../model/login';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../model/user.model';


@Injectable({ providedIn: 'root' })

export class AuthStore {
  private subject = new BehaviorSubject<User>(null);
  users$: Observable<User> = this.subject.asObservable();
  logoutTimer: any;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.users$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(login => !login));
    this.autoLogin();
  }

  login(loginRequestBody: Login): Observable<UserData> {
    return this.http
      .post<{ [key: string]: UserData }>(
        '/api/Auth/login',
        loginRequestBody,
        {
          headers: new HttpHeaders({ 'AUTH_KEY': environment.AUTH_KEY })
        }
      )
      .pipe(
        map(data => data.payload),
        tap(
          resData => {
            const lastLoginDate = new Date(resData.last_login_date);
            const expiredAt = new Date(resData.expired_at);
            const user = new User(resData.ADMIN_ID, resData.name, lastLoginDate, expiredAt, resData.AUTH_TOKEN);
            const expiredAtMiliSec = (expiredAt.getTime() - new Date().getTime());
            this.subject.next(user);
            this.autoLogout(expiredAtMiliSec);  // time in mili seconds
            localStorage.setItem('user_data', JSON.stringify(user));
          }),
        shareReplay(),
        catchError(error => {
          return throwError(error.error.msg);
        }),
      );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem('user_data');
    this.router.navigateByUrl('admin/login');
    clearTimeout(this.logoutTimer);
  }

  autoLogout(expireTimeinMiliSeconds) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expireTimeinMiliSeconds);
  }

  getLocalData() {
    const user = JSON.parse(localStorage.getItem('user_data'));
    if (user) {
      const lastLogin = new Date(user.last_login_date);
      const expiredAt = new Date(user.expired_at);
      const loadedUser = new User(user.ADMIN_ID, user.name, lastLogin, expiredAt, user._AUTH_TOKEN);
      return loadedUser;
    } else {
      return;
    }

  }

  autoLogin() {
    const loadedUser = this.getLocalData();
    console.log(loadedUser);
    if (loadedUser) {
      if (loadedUser.AUTH_TOKEN) {
        this.subject.next(loadedUser);
        const expiredDate = loadedUser.expired_at.getTime() - new Date().getTime();
        this.autoLogout(expiredDate);  // time in mili seconds
      }
    } else {
      return;
    }
  }


}

