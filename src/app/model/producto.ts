export class Producto {
    // estos datos se rellenarán a través de una petición GET a nuestra entidad producto creada en JHipster.
    id: number;
    nombre: string;
    cantidad: number;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.cantidad = 0;
    }
}