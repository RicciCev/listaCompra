import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    // nuestro array de productos a partir de los datos que recibe el producto en la carpeta model.
    private productos: Array<Producto>;

    constructor() {
        this.productos = new Array<Producto>();
    }

    public getProductos(): Array<Producto> {
        return this.productos;
    }
}
