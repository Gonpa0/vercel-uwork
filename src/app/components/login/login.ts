import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    const request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        // Guardar token
        sessionStorage.setItem('token', data.jwttoken);

        // Decodificar y guardar rol
        const helper = new JwtHelperService();
        const decoded = helper.decodeToken(data.jwttoken);
        const rol = decoded?.role;
        if (rol) {
          sessionStorage.setItem('rol', rol); // opcional
        }

        // Actualizar signals
        this.loginService.actualizarEstado();

        // Mostrar mensaje
        this.snackBar.open('Bienvenido, sesión iniciada.', 'Cerrar', {
          duration: 2500
        });

        // Redirigir
        this.router.navigate(['/inicio']);
      },
      error: () => {
        this.snackBar.open('Credenciales incorrectas!!!', 'Cerrar', {
          duration: 2500
        });
      }
    });
  }
  cancelar(): void {
    this.router.navigate(['home']);
  }
}
