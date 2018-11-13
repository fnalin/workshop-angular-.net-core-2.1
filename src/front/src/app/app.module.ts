import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuModule } from './menus/menu.module';
import { PageModule } from './pages/page.module';
import { AppRoutingModule } from './app.routing.module';
import { ClienteModule } from './clientes/cliente.module';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, MenuModule, PageModule, ClienteModule, LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
