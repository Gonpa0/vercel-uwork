import { Component } from '@angular/core';
import { Listarmensaje } from './listarmensaje/listarmensaje';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  imports: [RouterOutlet,Listarmensaje],
  templateUrl: './mensaje.html',
  styleUrl: './mensaje.css'
})
export class Mensaje {
  constructor(public route:ActivatedRoute){}
}
