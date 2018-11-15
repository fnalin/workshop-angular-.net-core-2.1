import {NgModule} from '@angular/core';
import { SignInModule } from './signin/signin.module';
import { SignUpModule } from './signup/signup.module';

@NgModule({
    declarations: [],
    imports: [ SignInModule, SignUpModule ],
    exports: []
})
export class SignModule {}
