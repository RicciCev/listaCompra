import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos: Array<Producto>;

  constructor(
    private loginService: LoginService,
    private productosService: ProductosService
    ) {
      this.productos = this.productosService.getProductos();
    }

  ngOnInit(): void {
  }

}
