import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';
import { UserService } from './user.service';
import { NotificationService } from '../notification/notification.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private userService: UserService,
        private notification: NotificationService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(req);
        // console.log(next);
        if (this.tokenService.hasToken()) {

            if (this.tokenService.isTokenExpired) {
                this.logOut();
                return null;
            }

            const token = this.tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    'Authorization': `bearer ${token}`
                }
            });
        }
        // return next.handle(req);


        return next.handle(req)

            .pipe(tap(

                response => {
                    // se tudo certo no http, passa por aqui
                    // console.log({ 'tudo certo': response });
                }

                , (err: any) => {
                    // console.log({ 'caiu no erro': error });
                    // console.log(this.router.url);
                    if (err.status === 401) {
                        this.logOut();
                    }
                }

                , () => {
                    // se der erro não passa por aqui
                    // console.log({'fim': 'fim'};
                }
                )
            );
    }

    private logOut() {
        this.notification.showError('Unauthorized', 'WorkShopAngularNetCore');
        this.router.navigate(['/error/401']);
        this.userService.logOut();
    }

}
