import { Component } from '@angular/core';
import { UserService } from 'src/app/sign/user.service';
import { UserModel } from 'src/app/sign/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-top',
    templateUrl: 'menu-top.component.html'
})
export class MenuTopComponent {

    // é uma boa prática colocar o $ num observable
    user$: Observable<UserModel>;
    // user: UserModel; é definido através do as no template

    constructor(private userService: UserService, private route: Router) {
        this.user$ = userService.user;
        // usando o pipe async no template não é necessário se inscrever
        // this.user$.subscribe(user => this.user = user);
    }

    logOut() {
        this.userService.logOut();
        this.route.navigate(['/signin']);
    }
}
