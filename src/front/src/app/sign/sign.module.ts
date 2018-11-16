import {NgModule} from '@angular/core';
import { SignInModule } from './signin/signin.module';
import { SignUpModule } from './signup/signup.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';

@NgModule({
    declarations: [],
    imports: [ SignInModule, SignUpModule ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class SignModule {}
