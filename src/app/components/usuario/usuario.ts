import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listausuario } from './listausuario/listausuario';

@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet,Listausuario],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {
  constructor(public route:ActivatedRoute){}
}
