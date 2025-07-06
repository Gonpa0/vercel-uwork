import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            RouterLink,
          CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  isLoggedIn = signal(false);
  rolUsuario = signal('');
  rutaActual = signal('');

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.loginStatus$.subscribe((estado) => this.isLoggedIn.set(estado));
    this.loginService.userRol$.subscribe((rol) => this.rolUsuario.set(rol));

    // Detectar la ruta actual
    this.router.events.subscribe(() => {
      this.rutaActual.set(this.router.url);
    });
  }

  isLoggedInUsuario(): boolean {
    return this.isLoggedIn();
  }

  rolUsuarioActual(): string {
    return this.rolUsuario();
  }

  rutaEsHome(): boolean {
    return this.rutaActual() === '/home';
  }

  logout() {
    this.loginService.logout();
  }
  registrar(): void {
    this.router.navigate(['usuarios/nuevo']);
  }
}
