import { Component } from '@angular/core';
import { Listarnotificacion } from "./listarnotificacion/listarnotificacion";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notificacion',
  imports: [Listarnotificacion,RouterOutlet],
  templateUrl: './notificacion.html',
  styleUrl: './notificacion.css'
})
export class Notificacion {
 constructor(public route:ActivatedRoute){
 }
}
