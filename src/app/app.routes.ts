import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';

export const routes: Routes = [
    {
        path: '',
        component: Inicio
    },
    { 
        path: 'usuarios', 
        loadChildren: () => import('./modules/usuarios/usuarios-module').then(m => m.UsuariosModule) 
    },
    { 
        path: 'productos', 
        loadChildren: () => import('./modules/productos/productos-module').then(m => m.ProductosModule) 
    },
    { 
        path: '**', 
        redirectTo: ''
    }
];
