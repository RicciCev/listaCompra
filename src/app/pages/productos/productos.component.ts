import { LoginService } from 'src/app/services/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/model/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  public productos: Array<Producto>;
  private sub: any;
  private subLogin: any;

  constructor(
    private loginService: LoginService,
    private productosService: ProductosService,
    private router: Router
    ) {
      // si el boolean isLogin del LoginService es falso nos llevará a la página login de nuevo porque las credenciales son incorrectas.
      if (!this.loginService.getIsLogin) {
        this.router.navigate(['login']);
      }
      this.productos = this.productosService.getListaProductos();
    }

  ngOnInit(): void {
    this.sub = this.productosService.getProductosSub().subscribe(
      // el resultado será un array de tipo Producto.
      (response: Array<Producto>) => {
        // asignamos el resultado de la petición al array que hace binding con el html para mostrar los datos del array en la tabla.
        this.productos = response;
      },
      error => {
        console.log(error);
      }
    );

    // volver al login para no entrar a la página productos sin autorización.
    this.subLogin = this.loginService.getIsLoginSub().subscribe(
      (response: boolean) => {
        // vuelve al login cuando el boolean isLogin del LoginService es false.
        if (response === false) {
          this.router.navigate(['login']);
        }
      },
      error => {
        console.log(error);
      }
    );
    this.productosService.getProductos();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subLogin.unsubscribe();
  }
}
