import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
}

@Injectable({
  providedIn: 'root',
})
export class Usuarios {

  private listaUsuarios: Usuario[] = [
    { 
      id: 1, 
      nombre: 'Juan Pérez', 
      email: 'juan@example.com', 
      rol: 'Administrador', 
      estado: 'Activo'  
    },
    { 
      id: 2, 
      nombre: 'Ana Gómez', 
      email: 'ana@example.com', 
      rol: 'Editor', 
      estado: 'Activo' 
    },
    { 
      id: 3, 
      nombre: 'Carlos Ruiz', 
      email: 'carlos@example.com', 
      rol: 'Espectador', 
      estado: 'Inactivo' 
    }
  ]
  
  getUsuarios(){
    return [...this.listaUsuarios]
  }

  getUsuarioById(id: number): Usuario | undefined {
    return this.listaUsuarios.find((usuario) => usuario.id === id);
  }

  addUsuario(usuario_raw: Omit<Usuario, 'id'>): Usuario{

    const new_usuario_id = this.listaUsuarios.length > 0
    ? Math.max(...this.listaUsuarios.map(usuario => usuario.id)) + 1
    : 1
    const new_usuario : Usuario = {
      id: new_usuario_id,
      ...usuario_raw
    }
    this.listaUsuarios.push(new_usuario)
    return new_usuario
  }

  deleteUsuarioById(id: number): boolean {
    const original_length = this.listaUsuarios.length
    this.listaUsuarios = this.listaUsuarios.filter((usuario) => {
      return usuario.id !== id
    })
    return this.listaUsuarios.length < original_length
  }
}
