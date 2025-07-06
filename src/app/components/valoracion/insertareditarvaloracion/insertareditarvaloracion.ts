
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { Valoracion } from '../../../models/Valoracion';
import { Usuario } from '../../../models/Usuario';
import { Asesoria } from '../../../models/Asesoria';
import { ValoracionService } from '../../../services/valoracion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AsesoriaService } from '../../../services/asesoria.service';

@Component({
  selector: 'app-insertareditarvaloracion',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './insertareditarvaloracion.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarvaloracion.css'
})
export class Insertareditarvaloracion implements OnInit{
    form:FormGroup = new FormGroup({})
    valoracion: Valoracion = new Valoracion()
    id:number=0
    edicion: boolean = false
    listaAsesorias: Asesoria[]=[]
    listaUsuarios: Usuario[]=[]


    constructor(
      private formBuilder: FormBuilder,
      private vS: ValoracionService,
      private route:ActivatedRoute,
      private router: Router,
      private uS:UsuarioService,
      private aS: AsesoriaService
    ){}
    ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
    this.form = this.formBuilder.group({
      codigo: [0],
      calificacion: ['', Validators.required],
      asesoria: ['', Validators.required],
      usuario: ['', Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
    this.aS.list().subscribe(data=>{
      this.listaAsesorias = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.valoracion.idValoracion = this.form.value.codigo,
      this.valoracion.calificacion = this.form.value.calificacion,
      this.valoracion.asesoria.idAsesoria = this.form.value.asesoria,
      this.valoracion.usuario.idUsuario = this.form.value.usuario

      if (this.edicion) {
        this.vS.update(this.valoracion).subscribe(data=>{
          this.vS.list().subscribe(data=>{
            this.vS.setList(data)
          })
        })
      }
      else{
        this.vS.insert(this.valoracion).subscribe(()=>{
            this.vS.list().subscribe(data=>{
              this.vS.setList(data)
            })
          })
      }
      this.router.navigate(['valoraciones'])
    }
  }
  init(){
    if (this.edicion) {
      this.vS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.idValoracion,
          calificacion: data.calificacion,
          asesoria: data.asesoria.idAsesoria,
          usuario: data.usuario.idUsuario
        })
      })
    }
  }

}
