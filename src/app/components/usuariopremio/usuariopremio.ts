import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listausuariopremio } from './listausuariopremio/listausuariopremio';

@Component({
  selector: 'app-usuariopremio',
  imports: [RouterOutlet,Listausuariopremio],
  templateUrl: './usuariopremio.html',
  styleUrl: './usuariopremio.css'
})
export class Usuariopremio {
  constructor(public route:ActivatedRoute){}
}
