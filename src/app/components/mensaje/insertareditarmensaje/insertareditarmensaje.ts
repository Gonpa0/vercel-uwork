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
import { Mensaje } from '../../../models/Mensaje';
import { Usuario } from '../../../models/Usuario';
import { Asesoria } from '../../../models/Asesoria';
import { MensajeService } from '../../../services/mensaje.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AsesoriaService } from '../../../services/asesoria.service';

@Component({
  selector: 'app-insertareditarmensaje',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './insertareditarmensaje.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarmensaje.css'
})
export class Insertareditarmensaje implements OnInit{
  form:FormGroup = new FormGroup({})
  mensaje: Mensaje = new Mensaje()
  id:number=0
  edicion: boolean = false
  listaUsuarios: Usuario[]=[]
  listaAsesorias: Asesoria[]=[]

  constructor(
      private formBuilder: FormBuilder,
      private mS: MensajeService,
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
      contenido: ['', Validators.required],
      fechaMensaje: ['', Validators.required],
      orden: ['', Validators.required],
      usuario: ['', Validators.required],
      asesoria: ['', Validators.required],
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
      this.mensaje.idMensaje = this.form.value.codigo,
      this.mensaje.contenido = this.form.value.contenido,
      this.mensaje.fechaMensaje = this.form.value.fechaMensaje,
      this.mensaje.orden = this.form.value.orden,
      this.mensaje.usuario.idUsuario = this.form.value.usuario,
      this.mensaje.asesoria.idAsesoria = this.form.value.asesoria
      if (this.edicion) {
        this.mS.update(this.mensaje).subscribe(data=>{
          this.mS.list().subscribe(data=>{
            this.mS.setList(data)
          })
        })
      }
      else{
        this.mS.insert(this.mensaje).subscribe(()=>{
            this.mS.list().subscribe(data=>{
              this.mS.setList(data)
            })
          })
      }
      this.router.navigate(['mensajes'])
    }
  }
  init(){
    if (this.edicion) {
      this.mS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.idMensaje,
          contenido: data.contenido,
          fechaMensaje: data.fechaMensaje,
          orden: data.orden,
          usuario: data.usuario.idUsuario,
          asesoria: data.asesoria.idAsesoria
        })
      })
    }
  }
}
