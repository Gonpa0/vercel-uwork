import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarpremio } from './listarpremio/listarpremio';

@Component({
  selector: 'app-premio',
  imports: [RouterOutlet,Listarpremio],
  templateUrl: './premio.html',
  styleUrl: './premio.css'
})
export class Premio {
  constructor(public route:ActivatedRoute){}
}
