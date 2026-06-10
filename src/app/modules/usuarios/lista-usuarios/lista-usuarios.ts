import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Usuarios } from '../services/usuario';


@Component({
  selector: 'app-lista-usuarios',
  imports: [],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  private router = inject(Router)
  usuariosLista: Usuario[] = [];
  private usuariosService = inject(Usuarios)

  ngOnInit(): void{
    this.cargarUsuarios()
  }
  
  cargarUsuarios():void{
    this.usuariosLista = this.usuariosService.getUsuarios()
  }
  
  agregarUsuarioSimulado(): void {
    const nombres_ejemplo = [
      'Usuario 1',
      'Usuario 2',
      'Usuario 3'
    ]

    const nombre_aleatorio = nombres_ejemplo[Math.floor(Math.random() * nombres_ejemplo.length)]

    const usuario_simulado: Omit<Usuario, 'id'> = {
      nombre: nombre_aleatorio,
      email: `${nombre_aleatorio.replace(/\s+/g, '.').toLowerCase()}@example.com`,
      rol: 'Espectador',
      estado: 'Activo'
    }

    this.usuariosService.addUsuario(usuario_simulado)
    
    this.cargarUsuarios()
  }
  
    eliminarUsuario(id: number): void {
      const seElimino = this.usuariosService.deleteUsuarioById(id)
  
      if(seElimino){
        this.cargarUsuarios()
      }
    }

  verDetalleUsuario(id: number): void {
    this.router.navigateByUrl('usuarios/' + id)
  }

  cambiarEstadoUsuario(id: number): void {
    const usuario = this.usuariosService.getUsuarioById(id)

    if(usuario){
      usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo'
      
      this.cargarUsuarios()
    }
  }

  irCrearUsuario() {
    this.router.navigateByUrl('usuarios/crear')
  }
}
