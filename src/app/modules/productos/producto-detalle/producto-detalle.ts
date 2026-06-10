import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, Productos } from '../services/producto';
import { CurrencyPipe } from '@angular/common';
import { DescuentoProductoPipe } from '../pipes/descuento-producto-pipe';

@Component({
  selector: 'app-producto-detalle',
  imports: [CurrencyPipe, DescuentoProductoPipe],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productosService = inject(Productos);

  producto: Producto | undefined;

  ngOnInit(): void {
    // Obtenemos el ID de los parámetros de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.producto = this.productosService.getProductoById(Number(idParam));
    }

    // Si el usuario ingresa un ID que no existe, lo regresamos a la lista
    if (!this.producto) {
      this.router.navigate(['/productos']);
    }
  }

  volver(): void {
    this.router.navigate(['/productos']);
  }
}
