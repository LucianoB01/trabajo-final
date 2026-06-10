import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, Usuarios } from '../services/usuario';

@Component({
  selector: 'app-usuario-detalle',
  imports: [],
  templateUrl: './usuario-detalle.html',
  styleUrl: './usuario-detalle.css',
})
export class UsuarioDetalle {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuariosService = inject(Usuarios);

  usuario: Usuario | undefined;

  ngOnInit(): void {
    // Obtenemos el ID de los parámetros de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.usuario = this.usuariosService.getUsuarioById(Number(idParam));
    }

    // Si el usuario ingresa un ID que no existe, lo regresamos a la lista
    if (!this.usuario) {
      this.router.navigate(['/usuarios']);
    }
  }

  volver(): void {
    this.router.navigate(['/usuarios']);
  }
}
