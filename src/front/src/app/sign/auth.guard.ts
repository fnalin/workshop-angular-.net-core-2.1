import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // console.log('Route Guard ativado');
        // console.log(route);
        // console.log(state);

        if (!this.userService.isLogged) {
            this.router.navigate(['/signin']);
            return false;
        }

        // permite acesso
        return true;
    }

}
