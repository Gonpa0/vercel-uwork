import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticuloService } from '../../../services/articulo.service';
import { BuscarPorAutorDTO } from '../../../models/BuscarPorAutorDTO';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-buscarporautor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './buscarporautor.html',
  styleUrls: ['./buscarporautor.css']
})
export class BuscarporautorComponent {
  form: FormGroup;
  resultados: BuscarPorAutorDTO[] = [];
  autorBuscado: string = '';
  sinResultados: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService
  ) {
    this.form = this.fb.group({
      autor: ['', Validators.required]
    });
  }

  buscar() {
    if (this.form.valid) {
      const autor = this.form.value.autor.trim();
      this.autorBuscado = autor;
      this.articuloService.buscarporautor(autor).subscribe(data => {
        this.resultados = data;
        this.sinResultados = data.length === 0;
      });
    }
  }
}
