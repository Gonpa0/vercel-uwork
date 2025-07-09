import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listardisponibilidad } from "./listardisponibilidad/listardisponibilidad";

@Component({
  selector: 'app-disponibilidad',
  imports: [RouterOutlet, Listardisponibilidad],
  templateUrl: './disponibilidad.html',
  styleUrl: './disponibilidad.css'
})
export class Disponibilidad {
  constructor(public route:ActivatedRoute){
  }
}
