import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductosComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [ProductosComponent]
})
export class ProductosModule { }
