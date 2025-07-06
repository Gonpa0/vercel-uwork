import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { Usuario } from '../../../models/Usuario';
import { Articulo } from '../../../models/Articulo';
import { ArticuloService } from '../../../services/articulo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditararticulo',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './insertareditararticulo.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditararticulo.css'
})
export class Insertareditararticulo implements OnInit{
  form:FormGroup = new FormGroup({})
  valorDefecto:boolean=true
  articulo: Articulo = new Articulo()
  id:number=0
  edicion: boolean = false
  listaUsuarios: Usuario[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private articuloS:ArticuloService,
    private route:ActivatedRoute,
    private router: Router,
    private usuarioS:UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
      this.form = this.formBuilder.group({
      codigo: [0],
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      autor: ['', Validators.required],
      usuario: ['', Validators.required],
    })
    this.usuarioS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.articulo.idArticulo = this.form.value.codigo,
      this.articulo.titulo = this.form.value.titulo,
      this.articulo.contenido = this.form.value.contenido,
      this.articulo.fecha = this.form.value.fecha,
      this.articulo.autor = this.form.value.autor,
      this.articulo.usuario.idUsuario = this.form.value.usuario

      if (this.edicion) {
        this.articuloS.update(this.articulo).subscribe(data=>{
          this.articuloS.list().subscribe(data=>{
            this.articuloS.setList(data)
          })
        })
      }
      else{
        this.articuloS.insert(this.articulo).subscribe(()=>{
            this.articuloS.list().subscribe(data=>{
              this.articuloS.setList(data)
            })
          })
      }
      this.router.navigate(['articulos'])
    }
  }

 init() {
  if (this.edicion) {
    this.articuloS.listId(this.id).subscribe(data => {
      setTimeout(() => {
        this.form.patchValue({
          codigo: data.idArticulo,
          titulo: data.titulo,
          contenido: data.contenido,
          fecha: this.convertirUTCaLocal(data.fecha),
          autor: data.autor,
          usuario: data.usuario.idUsuario
        });
      });
    });
  }
}

//FUNCION PARA QUE LE SUME 1 AL DIA

convertirUTCaLocal(fecha: string | Date): Date {
  const fechaDate = new Date(fecha);
  return new Date(
    fechaDate.getFullYear(),
    fechaDate.getMonth(),
    fechaDate.getDate() + 1 // ← ¡aquí se suma 1 día!
  );
}



}
