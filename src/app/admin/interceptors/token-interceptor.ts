import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler, HttpEvent,HttpInterceptor} from '@angular/common/http';
import { AuthStore} from "../services/auth.store";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthStore) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        if(this.auth.isLoggedIn$)
        {
            const user = this.auth.users$.subscribe(user=> user);
            console.log(user);
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${}`
                }
            });
            return next.handle(request);
        }
       
    }
}