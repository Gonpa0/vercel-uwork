import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComentarioArticulo } from '../../../models/ComentarioArticulo';
import { Articulo } from '../../../models/Articulo';
import { Usuario } from '../../../models/Usuario';
import { ArticuloService } from '../../../services/articulo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ComentarioarticuloService } from '../../../services/comentarioarticulo.service';

@Component({
  selector: 'app-insertareditarcomentarioarticulo',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarcomentarioarticulo.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarcomentarioarticulo.css'
})
export class Insertareditarcomentarioarticulo implements OnInit{


  form:FormGroup = new FormGroup({})
  comentarioArticulo: ComentarioArticulo = new ComentarioArticulo()
  id:number=0
  edicion: boolean = false

  listaArticulos: Articulo[]=[]
  listaUsuarios: Usuario[]=[]


  constructor(
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private comentarioArticuloS: ComentarioarticuloService,
    private articuloS: ArticuloService,
    private usuarioS:UsuarioService ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
      this.form = this.formBuilder.group({
      codigo: [0],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      tituloarticulo:['',Validators.required],
      nombreusuario:['', Validators.required],
    })

    //PARA QUE SE MUESTRE LA LISTA DE ARTICULOS EN EL MATSELECT

    this.articuloS.list().subscribe(data=>{
        this.listaArticulos = data
    })
    //PARA QUE SE MUESTRE LA LISTA DE USUARIOS EN EL MATSELECT
    this.usuarioS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.comentarioArticulo.idComentario = this.form.value.codigo,
      this.comentarioArticulo.contenido= this.form.value.contenido,
      this.comentarioArticulo.fecha = this.form.value.fecha,
      this.comentarioArticulo.articulo.idArticulo = this.form.value.tituloarticulo,
      this.comentarioArticulo.usuario.idUsuario = this.form.value.nombreusuario

      if (this.edicion) {
        this.comentarioArticuloS.update(this.comentarioArticulo).subscribe(data=>{
          this.comentarioArticuloS.list().subscribe(data=>{
            this.comentarioArticuloS.setList(data)
          })
        })
      }
      else{
        this.comentarioArticuloS.insert(this.comentarioArticulo).subscribe(()=>{
            this.comentarioArticuloS.list().subscribe(data=>{
              this.comentarioArticuloS.setList(data)
            })
          })
      }
      this.router.navigate(['comentarioarticulos'])
    }
  }
 init() {
  if (this.edicion) {
    this.comentarioArticuloS.listId(this.id).subscribe(data => {
      setTimeout(() => {
        this.form.patchValue({
          codigo: data.idComentario,
          contenido: data.contenido,
          fecha: this.convertirUTCaLocal(data.fecha),
          tituloarticulo: data.articulo.idArticulo,
          nombreusuario: data.usuario.idUsuario
        });
      });
    });
  }
}


convertirUTCaLocal(fecha: string | Date): Date {
  const fechaDate = new Date(fecha);
  return new Date(
    fechaDate.getFullYear(),
    fechaDate.getMonth(),
    fechaDate.getDate() + 1 // ← ¡aquí se suma 1 día!
  );
}

}
