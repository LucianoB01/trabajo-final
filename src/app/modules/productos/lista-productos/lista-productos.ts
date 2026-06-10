import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Producto, Productos } from '../services/producto';
import { Router } from '@angular/router';
import { DescuentoProductoPipe } from '../pipes/descuento-producto-pipe';

@Component({
  selector: 'app-lista-productos',
  imports: [
    CurrencyPipe,
    DescuentoProductoPipe
  ],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  private router = inject(Router)
  productosList: Producto[] = [];

  private productosService = inject(Productos)

  ngOnInit(): void{
    this.cargarProductos()
  }

  cargarProductos():void{
    this.productosList = this.productosService.getProductos()
  }

  agregarProductoSimulado(): void {
    const nombres_ejemplo = [
      'Producto 1',
      'Producto 2',
      'Producto 3'
    ]

    const nombre_aleatorio = nombres_ejemplo[Math.floor(Math.random() * nombres_ejemplo.length)]

    const precio_aleatorio = Math.floor(Math.random() * (1000 - 1) + 1 )

    const producto_simulado: Omit<Producto, 'id'> = {
      nombre: nombre_aleatorio,
      precio: precio_aleatorio,
      descripcion: "Descripción del producto simulado",
      descuento: 10
    }

    this.productosService.addProducto(producto_simulado)
    
    this.cargarProductos()
  }

  eliminarProducto(id: number): void {
    const seElimino = this.productosService.deleteProductoById(id)

    if(seElimino){
      this.cargarProductos()
    }
  }

  verDetalleProducto(id: number): void {
    this.router.navigateByUrl('productos/' + id)
  }
}
