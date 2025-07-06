import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarrol } from "./listarrol/listarrol";

@Component({
  selector: 'app-rol',
  imports: [RouterOutlet, Listarrol],
  templateUrl: './rol.html',
  styleUrl: './rol.css'
})
export class Rol {
  constructor(public route:ActivatedRoute){}
}
