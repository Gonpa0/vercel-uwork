import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarformatoarchivo } from "./listarformatoarchivo/listarformatoarchivo";

@Component({
  selector: 'app-formatoarchivo',
  imports: [RouterOutlet, Listarformatoarchivo],
  templateUrl: './formatoarchivo.html',
  styleUrl: './formatoarchivo.css'
})
export class Formatoarchivo {
  constructor(public route:ActivatedRoute){}
}
