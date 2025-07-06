import { Component } from '@angular/core';
import { Listararchivo } from "./listararchivo/listararchivo";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-archivo',
  imports: [Listararchivo,RouterOutlet],
  templateUrl: './archivo.html',
  styleUrl: './archivo.css'
})
export class Archivo {
constructor(public route:ActivatedRoute){
}
}
