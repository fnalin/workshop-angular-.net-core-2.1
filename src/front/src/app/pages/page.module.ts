import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';

@NgModule({
    imports: [ShowIfLoggedModule],
    declarations: [ HomeComponent, AboutComponent, NotFoundComponent, UnauthorizedComponent ],
    exports: []
})
export class PageModule {}
