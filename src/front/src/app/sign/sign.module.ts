import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './request.interceptor';

import { SignComponent } from './sign.component';

import { SignInModule } from './signin/signin.module';
import { SignUpModule } from './signup/signup.module';
import { SignRoutingModule } from './sign.routing.module';

@NgModule({
    declarations: [SignComponent],
    imports: [
        RouterModule,
        SignInModule, SignUpModule,
        SignRoutingModule
    ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class SignModule { }
