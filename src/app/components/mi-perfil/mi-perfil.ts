import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  imports:[MatIconModule, CommonModule],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css'
})


export class MiPerfil implements OnInit {
  usuario: Usuario = new Usuario();
  cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    const id = this.loginService.getIdUsuario();
    console.log(id);
    if (id) {
      this.obtenerDatos(id);
    } else {
      setTimeout(() => {
        const retryId = this.loginService.getIdUsuario();
        if (retryId) {
          this.obtenerDatos(retryId);
        } else {
          console.warn('ID de usuario aún no disponible en el segundo intento');
          this.cargando = false;
        }
      }, 500);
    }
  }

  obtenerDatos(id: number) {
    this.usuarioService.listId(id).subscribe(data => {
      this.usuario = data;
      this.cargando = false;
    });
  }
}
