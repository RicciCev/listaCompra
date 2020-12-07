import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../model/producto';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    // nuestro array de productos a partir de los datos que recibe el producto en la carpeta model.
    private productos: Array<Producto>;
    private productos$: Subject<Array<Producto>>;

    constructor(
        private httpClient: HttpClient,
        private loginService: LoginService
        ) {
        this.productos = new Array<Producto>();
        this.productos$ = new Subject<Array<Producto>>();
    }

    // para podernos suscribirnos desde el component y escuchar por si suceden cambios.
    public getProductosSub(): Observable<any> {
        return this.productos$.asObservable();
    }

    public getListaProductos(): Array<Producto> {
        return this.productos;
    }

    public getProductos(): void {
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Authorization': 'Bearer ' + this.loginService.getToken()
                }
            )
        };

        // las peticiones get solo reciben una url y los headers como parámetros.
        this.httpClient.get('http://localhost:8080/api/productos', httpOptions).subscribe(
            (response: any) => {
                console.log(JSON.stringify(response));
                this.productos = response;
                // avisa al component que han habido cambios en dicho array.
                this.productos$.next(this.productos);
            },
            error => {
                console.log(error);
                this.loginService.logOut();
            }
        );
    }

    public deleteProduct(id: number): void {
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Authorization': 'Bearer ' + this.loginService.getToken()
                }
            )
        };

        this.httpClient.delete('http://localhost:8080/api/productos/' + id, httpOptions).subscribe(
            (response: any) => {
                console.log(response);
                // getProductos se encargará de todo, es decir de actualizar la lista.
                this.getProductos();
            },
            error => {
                console.log(error);
                // this.loginService.logOut();
            }
        );
    }
}
