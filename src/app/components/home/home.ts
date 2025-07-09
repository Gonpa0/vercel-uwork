import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  // Lista de pasos para la sección “Cómo empezar”
  pasos: string[] = [
    'Regístrate o inicia sesión con tu cuenta UPC.',
    'Elige tu rol: aprendiz (ciclo inferior) o mentor (ciclo superior).',
    'Crea o únete a asesorías según tu necesidad.',
    'Chatea y comparte recursos; recibe sugerencias de la IA.',
    'Evalúa y reporta para mejorar la comunidad.'
  ];

  // Lista de características para la sección “¿Por qué usar UWORK?”
  caracteristicas: string[] = [
    'Conexión fácil entre mentores y aprendices.',
    'Chat integrado con IA para dudas frecuentes.',
    'Gestión de archivos: comparte documentos, videos, audios.',
    'Calificaciones y reportes para mejorar la experiencia.',
    'Panel de notificaciones para mantenerse al día.'
  ];

  constructor() { }

  ngOnInit(): void {
    // Si necesitas inicializar algo, va aquí
  }
}
