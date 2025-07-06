
import { Component } from '@angular/core';
import { Listarvaloracion } from './listarvaloracion/listarvaloracion';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-valoracion',
  imports: [RouterOutlet,Listarvaloracion],
  templateUrl: './valoracion.html',
  styleUrl: './valoracion.css'
})
export class Valoracion {
  constructor(public route:ActivatedRoute){}
}
