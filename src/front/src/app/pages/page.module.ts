import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
    imports: [ShowIfLoggedModule],
    declarations: [ HomeComponent, AboutComponent, NotFoundComponent ],
    exports: []
})
export class PageModule {}
