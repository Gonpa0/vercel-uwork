import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarasesoria } from './listarasesoria/listarasesoria';

@Component({
  selector: 'app-asesoria',

  imports: [RouterOutlet,Listarasesoria],

  templateUrl: './asesoria.html',
  styleUrl: './asesoria.css'
})
export class Asesoria {

  constructor(public route:ActivatedRoute){}

}