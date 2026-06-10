import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  descuento: number; 
} 

@Injectable({
  providedIn: 'root',
})
export class Productos {

  private listaProductos: Producto[] = [
    {
      id: 1,
      nombre: "Producto 1",
      precio: 10,
      descripcion: "Descripción del producto 1",
      descuento: 10
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 20,
      descripcion: "Descripción del producto 2",
      descuento: 20
      },
      {
      id: 3,
      nombre: "Producto 3",
      precio: 30,
      descripcion: "Descripción del producto 3",
      descuento: 30
    },
  ]

  getProductos(){
    return [...this.listaProductos]
  }

  getProductoById(id: number): Producto | undefined {
    return this.listaProductos.find((producto) => producto.id === id);
  }

  addProducto(producto_raw: Omit<Producto, 'id'>): Producto{

    const new_producto_id = this.listaProductos.length > 0
    ? Math.max(...this.listaProductos.map(producto => producto.id)) + 1
    : 1
    const new_producto : Producto = {
      id: new_producto_id,
      ...producto_raw
    }
    this.listaProductos.push(new_producto)
    return new_producto
  }

  deleteProductoById(id: number): boolean {
    const original_length = this.listaProductos.length
    this.listaProductos = this.listaProductos.filter((producto) => {
      return producto.id !== id
    })
    return this.listaProductos.length < original_length
  }
}
