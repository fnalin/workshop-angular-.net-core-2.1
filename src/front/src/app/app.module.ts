import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuModule } from './menus/menu.module';
import { PageModule } from './pages/page.module';
import { AppRoutingModule } from './app.routing.module';
import { ClienteModule } from './clientes/cliente.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, MenuModule, PageModule, ClienteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
