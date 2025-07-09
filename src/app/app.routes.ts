import { Routes } from '@angular/router';
import { Formatoarchivo } from './components/formatoarchivo/formatoarchivo';
import { Insertareditar } from './components/formatoarchivo/insertareditar/insertareditar';
import { Rol } from './components/rol/rol';
import { Insertareditarrol } from './components/rol/insertareditarrol/insertareditarrol';
import { Premio } from './components/premio/premio';
import { Insertareditarpremio } from './components/premio/insertareditarpremio/insertareditarpremio';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';
import { Usuario } from './components/usuario/usuario';
import { Insertareditarusuario } from './components/usuario/insertareditarusuario/insertareditarusuario';
import { Inicio } from './components/inicio/inicio';
import { Usuariopremio } from './components/usuariopremio/usuariopremio';
import { Insertareditarusuariopremio } from './components/usuariopremio/insertareditarusuariopremio/insertareditarusuariopremio';
import { ArticuloComponent } from './components/articulo/articulo';
import { Insertareditararticulo } from './components/articulo/insertareditararticulo/insertareditararticulo';
import { Comentarioarticulo } from './components/comentarioarticulo/comentarioarticulo';
import { Insertareditarcomentarioarticulo } from './components/comentarioarticulo/insertareditarcomentarioarticulo/insertareditarcomentarioarticulo';
import { Asesoria } from './components/asesoria/asesoria';
import { Insertareditarasesoria } from './components/asesoria/insertareditarasesoria/insertareditarasesoria';
import { Insertareditarvaloracion } from './components/valoracion/insertareditarvaloracion/insertareditarvaloracion';
import { Insertareditarmensaje } from './components/mensaje/insertareditarmensaje/insertareditarmensaje';
import { Valoracion } from './components/valoracion/valoracion';
import { Mensaje } from './components/mensaje/mensaje';
import { Notificacion } from './components/notificacion/notificacion';
import { Insertareditarnotificacion } from './components/notificacion/insertareditarnotificacion/insertareditarnotificacion';
import { Buscar } from './components/articulo/buscar/buscar';
import { Reportes } from './components/reportes/reportes';
import { Disponibilidad } from './components/disponibilidad/disponibilidad';
import { Insertareditardisponibilidad } from './components/disponibilidad/insertareditardisponibilidad/insertareditardisponibilidad';
import { Archivo } from './components/archivo/archivo';
import { Insertareditararchivo } from './components/archivo/insertareditararchivo/insertareditararchivo';
import { ChatAsesoria } from './components/asesoria/chat-asesoria/chat-asesoria';
import { Listausariossinpassword } from './components/usuario/listausariossinpassword/listausariossinpassword';
import { seguridadGuard } from './guard/seguridad.guard';
import { Login } from './components/login/login';
import { Chat } from './components/chat/chat';
import { BuscarporautorComponent } from './components/articulo/buscarporautor/buscarporautor';
import { MiPerfil } from './components/mi-perfil/mi-perfil';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //publico es el landing page
  { path: 'home', component: Home }, //publico no necesitas ni estar logueado ni tener algun rol para ingresar
  { path: 'nosotros', component: Nosotros }, //publico no necesitas ni estar logueado ni tener algun rol para ingresar
  { path: 'login', component: Login }, //publico
  { path: 'inicio', component: Inicio, canActivate: [seguridadGuard] }, //sin rol pero necesitas loguearte
  { path: 'chatIA', component: Chat }, //sin rol pero necesitas loguearte

  // === PREMIOS ===
  {
    path: 'premios',
    component: Premio, // publico no necesitas ni estar logueado ni tener algun rol para ingresar - listar premios
    children: [
      { path: 'nuevo', component: Insertareditarpremio,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] }
       },
      { path: 'ediciones/:id', component: Insertareditarpremio,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] }
      }
    ]
  },

  // === ARTÍCULOS ===
  {
    path: 'articulos',
    component: ArticuloComponent, // ✅ Pública
    children: [
      { path: 'nuevo', component: Insertareditararticulo, canActivate: [seguridadGuard] },
      { path: 'ediciones/:id', component: Insertareditararticulo, canActivate: [seguridadGuard] },
      { path: 'busquedas', component: Buscar }, // ✅ Pública
      { path: 'articuloporautor', component: BuscarporautorComponent, canActivate: [seguridadGuard] } // Pública
    ]
  },

  // === USUARIOS ===
  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: 'nuevo', component: Insertareditarusuario },
      { path: 'ediciones/:id', component: Insertareditarusuario },
      { path: 'listarsinpassword', component: Listausariossinpassword }
    ],
    //canActivate: [seguridadGuard],
    //data: { roles: ['DESARROLLADOR','ADMIN'] },
  },

  // === ROLES (solo DESARROLLADOR) ===
  {
    path: 'roles',
    component: Rol,
    children: [
      { path: 'nuevo', component: Insertareditarrol},
      { path: 'ediciones/:id', component: Insertareditarrol}
    ],
    canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
  },

  // === USUARIO PREMIO ===
  {
    path: 'usuariopremios',
    component: Usuariopremio,
     canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
    children: [
      { path: 'nuevo', component: Insertareditarusuariopremio,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] }
         },
      { path: 'ediciones/:id', component: Insertareditarusuariopremio,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] }
       },
    ]
  },

  // === COMENTARIO ARTÍCULO ===
  {
    path: 'comentarioarticulos',
    component: Comentarioarticulo,
    canActivate: [seguridadGuard],
    children: [
      { path: 'nuevo', component: Insertareditarcomentarioarticulo },
      { path: 'ediciones/:id', component: Insertareditarcomentarioarticulo }
    ]
  },

  // === FORMATO ARCHIVO ===
  {
    path: 'formatoarchivos',
    component: Formatoarchivo,
     canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
    children: [
      { path: 'nuevo', component: Insertareditar ,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
      },
      { path: 'ediciones/:id', component: Insertareditar,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       }
    ]
  },

  // === ASESORÍA ===
  {
    path: 'asesorias',
    component: Asesoria,
    canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
    children: [
      { path: 'nuevo', component: Insertareditarasesoria,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       },
      { path: 'ediciones/:id', component: Insertareditarasesoria,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       },
      { path: 'chat/:id/:nombreAsesoria', component: ChatAsesoria,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
       }
    ]
  },

  // === VALORACIÓN ===
  {
    path: 'valoraciones',
    component: Valoracion,
    canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
    children: [
      { path: 'nuevo', component: Insertareditarvaloracion,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
       },
      { path: 'ediciones/:id', component: Insertareditarvaloracion,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
      }
    ]
  },

  // === MENSAJES ===
  {
    path: 'mensajes',
    component: Mensaje,
     canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
    children: [
      { path: 'nuevo', component: Insertareditarmensaje,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
       },
      { path: 'ediciones/:id', component: Insertareditarmensaje,
         canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       }
    ]
  },

  // === NOTIFICACIONES ===
  {
    path: 'notificaciones',
    component: Notificacion,
    canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
    children: [
      { path: 'nuevo', component: Insertareditarnotificacion,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       },
      { path: 'ediciones/:id', component: Insertareditarnotificacion,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       }
    ]
  },

  // === REPORTES ===
  { path: 'reports', component: Reportes, canActivate: [seguridadGuard] },

  // === DISPONIBILIDAD ===
  {
    path: 'disponibilidades',
    component: Disponibilidad,
    canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
    children: [
      { path: 'nuevo', component: Insertareditardisponibilidad,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR'] },
      },
      { path: 'ediciones/:id', component: Insertareditardisponibilidad,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR'] },
       }
    ]
  },

  // === ARCHIVOS ===
  {
    path: 'archivos',
    component: Archivo,
    canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
    children: [
      { path: 'nuevo', component: Insertareditararchivo,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       },
      { path: 'ediciones/:id', component: Insertareditararchivo,
        canActivate: [seguridadGuard],
    data: { roles: ['DESARROLLADOR','ADMIN'] },
       }
    ]
  },

  // MI PERFIL

  {
  path: 'miperfil',
  component: MiPerfil,
  canActivate: [seguridadGuard],
  data: { roles: ['DESARROLLADOR','ADMIN','ESTUDIANTESUPERIOR','ESTUDIANTEINFERIOR'] },
}
];
