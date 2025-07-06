import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { UsuarioPremio } from '../../../models/UsuarioPremio';
import { Usuario } from '../../../models/Usuario';
import { Premio } from '../../../models/Premio';
import { UsuariopremioService } from '../../../services/usuariopremio.service';
import { UsuarioService } from '../../../services/usuario.service';
import { PremioServices } from '../../../services/premio.service';

@Component({
  selector: 'app-insertareditarusuariopremio',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './insertareditarusuariopremio.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarusuariopremio.css'
})
export class Insertareditarusuariopremio implements OnInit{
  form:FormGroup = new FormGroup({})
  usuariopremio: UsuarioPremio = new UsuarioPremio()
  id:number=0
  edicion: boolean=false
  listaPremios: Premio[] = []
  listaUsuarios: Usuario[] = []
  

  constructor(
    private formBuilder: FormBuilder,
    private upS:UsuariopremioService,
    private route:ActivatedRoute,
    private router: Router,
    private uS:UsuarioService,
    private pS:PremioServices,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

      this.form = this.formBuilder.group({
      codigo: [0],
      usuario: ['', Validators.required],
      premio: ['', Validators.required]
      })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
    this.pS.list().subscribe(data=>{
      this.listaPremios = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.usuariopremio.id = this.form.value.codigo,
      this.usuariopremio.premio.id = this.form.value.premio,
      this.usuariopremio.usuario.idUsuario = this.form.value.usuario
      if (this.edicion) {
        this.upS.update(this.usuariopremio).subscribe(data=>{
          this.upS.list().subscribe(data=>{
            this.upS.setList(data)
          })
        })
      }
      else{
        this.upS.insert(this.usuariopremio).subscribe(()=>{
            this.upS.list().subscribe(data=>{
              this.upS.setList(data)
            })
          })
      }
      this.router.navigate(['usuariopremios'])
    }
  }
  init(){
    if (this.edicion) {
      this.upS.listId(this.id).subscribe(data=>{
        setTimeout(() => {
          this.form.patchValue({ 
          codigo: data.id,          
          premio: data.premio.id,
          usuario: data.usuario.idUsuario,
        })
        })
      })
    }
  }
}
