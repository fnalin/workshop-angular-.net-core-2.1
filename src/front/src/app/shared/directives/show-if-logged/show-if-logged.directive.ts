import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from 'src/app/sign/user.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) { }

    ngOnInit() {
        if (!this.userService.isLogged) {
            this.renderer.setElementStyle(this.element, 'display', 'none');
            // console.log(this.renderer, this.element);
        } else {
            this.renderer.setElementStyle(this.element.nativeElement, 'backgroundColor', 'yellow');
        }
    }
}
