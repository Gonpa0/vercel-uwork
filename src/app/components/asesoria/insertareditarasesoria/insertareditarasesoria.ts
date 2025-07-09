
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
import { Usuario } from '../../../models/Usuario';
import { AsesoriaService } from '../../../services/asesoria.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Asesoria } from '../../../models/Asesoria';

@Component({
  selector: 'app-insertareditarasesoria',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './insertareditarasesoria.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarasesoria.css'
})
export class Insertareditarasesoria implements OnInit{
    form:FormGroup = new FormGroup({})
    asesoria: Asesoria = new Asesoria()
    id:number=0
    edicion: boolean = false
    listaUsuariosInferior: Usuario[]=[]
    listaUsuariosSuperior: Usuario[]=[]
  constructor(
    private formBuilder: FormBuilder,
    private aS:AsesoriaService,
    private route:ActivatedRoute,
    private router: Router,
    private uS:UsuarioService
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
    this.form = this.formBuilder.group({
      codigo: [0],
      nombreAsesoria: ['', Validators.required],
      fechaAsesoria: ['', Validators.required],
      usuarioInferior: ['', Validators.required],
      usuarioSuperior: ['', Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuariosInferior = data
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuariosSuperior = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.asesoria.idAsesoria = this.form.value.codigo,
      this.asesoria.nombreAsesoria = this.form.value.nombreAsesoria
      this.asesoria.fechaAsesoria = this.form.value.fechaAsesoria,
      this.asesoria.usuarioInferior.idUsuario = this.form.value.usuarioInferior,
      this.asesoria.usuarioSuperior.idUsuario = this.form.value.usuarioSuperior

      if (this.edicion) {
        this.aS.update(this.asesoria).subscribe(data=>{
          this.aS.list().subscribe(data=>{
            this.aS.setList(data)
          })
        })
      }
      else{
        this.aS.insert(this.asesoria).subscribe(()=>{
            this.aS.list().subscribe(data=>{
              this.aS.setList(data)
            })
          })
      }
      this.router.navigate(['asesorias'])
    }
  }
  init(){
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.idAsesoria,
          nombreAsesoria: data.nombreAsesoria,
          fechaAsesoria: data.fechaAsesoria,
          usuarioInferior: data.usuarioInferior.idUsuario,
          usuarioSuperior: data.usuarioSuperior.idUsuario
        })
      })
    }
  }

}
