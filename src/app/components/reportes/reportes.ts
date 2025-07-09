import { Component } from '@angular/core';
import { Reportepromedionotificacion } from "./reportepromedionotificacion/reportepromedionotificacion";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [Reportepromedionotificacion,RouterOutlet],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {
  constructor(public route:ActivatedRoute){
  }
}
