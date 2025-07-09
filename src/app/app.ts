import { Component } from '@angular/core';
import { Menu } from "./components/menu/menu";
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [Menu,RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'demoFrontEnd3155Uwork4';
  constructor(private router: Router) {}

  get mostrarMenu() {
    const ocultarRutas = ['/login', '/register'];
    return !ocultarRutas.includes(this.router.url);
  }
}
