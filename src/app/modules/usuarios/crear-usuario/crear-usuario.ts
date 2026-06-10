import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario, Usuarios } from '../services/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
  crearForm: FormGroup
  errores: string[] = []
  camposTocados: boolean = false
  formularioEnviado: boolean = false
  private usuariosService = inject(Usuarios)
  private router = inject(Router)

  constructor(private formBuilder: FormBuilder) {
    this.crearForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      rol: [
        ''
      ],
      estado: [
        'Activo'
      ]
    });
  }

  crearUsuario(usuario: Omit<Usuario, 'id'>){
    console.log("Usuario creado:", usuario)

    const usuario_simulado: Omit<Usuario, 'id'> = {
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado
    }

    this.usuariosService.addUsuario(usuario_simulado)
  }

  submitCrearForm(){
    this.formularioEnviado = true

    console.log("Formulario enviado:", this.crearForm.getRawValue())

    this.crearUsuario({
      nombre: this.crearForm.get('name')?.value,
      email: this.crearForm.get('email')?.value,
      rol: this.crearForm.get('rol')?.value,
      estado: this.crearForm.get('estado')?.value
    })

    this.crearForm.reset()
    this.crearForm.markAsUntouched()
    this.camposTocados = false

    this.router.navigateByUrl('usuarios')
  }

  addError(error: string){
    if(!this.errores.includes(error)){
      this.errores.push(error)
    }
  }

  removeError(error: string){
    this.errores = this.errores.filter(e => e !== error)
  }

  getCrearFormError(): boolean {
    const formFields = Object.entries(this.crearForm.controls)
    this.errores.length = 0

    for (const [_, formField] of formFields) {
      if(formField.hasError(ERRORS.REQUIRED.NAME)){
        this.addError('Este campo es obligatorio')
      }
      if(formField.hasError(ERRORS.MIN_LENGTH.NAME)){
        const requiredLength = formField.errors?.[ERRORS.MIN_LENGTH.NAME].requiredLength
        this.addError('Debe tener al menos ' + requiredLength + ' caracteres')
      }
      if(formField.hasError(ERRORS.EMAIL.NAME)){
        this.addError('Debe ser un correo electrónico válido')
      }

      if(formField?.touched){
        this.camposTocados = true
      }
    }

    if(!this.camposTocados){
      this.errores.length = 0
      return false
    }

    return true
  }

}

const ERRORS = {
  MIN_LENGTH: {
    NAME: 'minlength',
  },
  REQUIRED: {
    NAME: 'required'
  },
  EMAIL: {
    NAME: 'email'
  }

}
