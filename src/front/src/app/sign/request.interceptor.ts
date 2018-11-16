import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(req);
        // console.log(next);
        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            // todo: verificar se o mesmo é válido (exp)
            req = req.clone({
                setHeaders: {
                    'Authorization': `bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }

}
