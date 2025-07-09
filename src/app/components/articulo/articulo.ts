import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listararticulo } from "./listararticulo/listararticulo";

@Component({
  selector: 'app-articulo',
  imports: [RouterOutlet, Listararticulo],
  templateUrl: './articulo.html',
  styleUrl: './articulo.css'
})
export class ArticuloComponent {
  constructor(public route:ActivatedRoute){}
}
