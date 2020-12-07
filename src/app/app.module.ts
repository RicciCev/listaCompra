import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from './services/productos.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule
  ],
  /* importamos el LoginService en el módulo padre del proyecto porque
  necesitaremos su token desde otros modulos y componentes que no sean el login. */
  providers: [LoginService, ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
