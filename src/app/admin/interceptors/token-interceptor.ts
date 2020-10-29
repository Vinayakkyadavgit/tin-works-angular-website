import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler, HttpEvent,HttpInterceptor} from '@angular/common/http';
import { AuthStore} from "../services/auth.store";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthStore) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.auth.getLocalData();
        if(user && user.AUTH_TOKEN)
        {
            request = request.clone({
                setHeaders: {
                    'AUTH_KEY': environment.AUTH_KEY,
                    'AUTH_TOKEN': user.AUTH_TOKEN,
                    'ADMIN_ID': String(user.ADMIN_ID),
                }
            });
            return next.handle(request);
        }else
        {
            request = request.clone({
                setHeaders: {
                    'AUTH_KEY': environment.AUTH_KEY
                }
            });
            return next.handle(request);
        }

    }
}
