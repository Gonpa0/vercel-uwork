import { Component } from '@angular/core';
import { Listarcomentarioarticulo } from "./listarcomentarioarticulo/listarcomentarioarticulo";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-comentarioarticulo',
  imports: [Listarcomentarioarticulo,RouterOutlet],
  templateUrl: './comentarioarticulo.html',
  styleUrl: './comentarioarticulo.css'
})
export class Comentarioarticulo {
  constructor(public route:ActivatedRoute){
  }
}
