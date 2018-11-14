import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenuTopComponent } from './menu-top/menu-top.component';
import { MenuRodapeComponent } from './menu-rodape/menu-rodape.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ MenuTopComponent, MenuRodapeComponent ],
    exports: [ MenuTopComponent, MenuRodapeComponent ]
})
export class MenuModule {}
