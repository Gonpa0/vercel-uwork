import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Archivo } from '../../../models/Archivo';
import { Usuario } from '../../../models/Usuario';
import { Asesoria } from '../../../models/Asesoria';
import { FormatoArchivo } from '../../../models/FormatoArchivo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArchivoService } from '../../../services/archivo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AsesoriaService } from '../../../services/asesoria.service';
import { FormatoarchivoService } from '../../../services/formatoarchivo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-insertareditararchivo',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule

  ],
  templateUrl: './insertareditararchivo.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditararchivo.css'
})
export class Insertareditararchivo implements OnInit{


  form:FormGroup = new FormGroup({})
  archivo: Archivo = new Archivo()
  id:number=0
  edicion: boolean = false

  listaUsuarios: Usuario[]=[]
  listaAsesorias: Asesoria[]=[]
  listaformatoArchivos: FormatoArchivo[]=[]


  constructor(
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private archivoS: ArchivoService,
    private usuarioS:UsuarioService,
    private asesoriaS: AsesoriaService,
    private formatoArchivoS: FormatoarchivoService ) {}

  ngOnInit(): void {
 // Primero se define el formulario
     this.form = this.formBuilder.group({
      codigo: [0],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      nombreusuario:['', Validators.required],
      nombreasesoria:['',Validators.required],
      nombreformatoArchivo:['',Validators.required]
    });
// Luego se lee el parámetro de ruta y se inicializa si es edición
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init() // ← esto ya puede usar this.form
    });

     // Cargar las listas para los mat-select
    this.usuarioS.list().subscribe(data=>{
      this.listaUsuarios = data
    })

     this.asesoriaS.list().subscribe(data=>{
      this.listaAsesorias = data
    })

     this.formatoArchivoS.list().subscribe(data=>{
      this.listaformatoArchivos = data
    })

  }
  aceptar(){
    if (this.form.valid) {
      this.archivo.id = this.form.value.codigo
      this.archivo.nombreArchivo = this.form.value.nombre
      this.archivo.fechaSubida = this.form.value.fecha
      this.archivo.usuario.idUsuario = this.form.value.nombreusuario
      this.archivo.asesoria.idAsesoria = this.form.value.nombreasesoria
      this.archivo.formatoArchivo.id = this.form.value.nombreformatoArchivo

      if (this.edicion) {
        this.archivoS.update(this.archivo).subscribe(data=>{
          this.archivoS.list().subscribe(data=>{
            this.archivoS.setList(data)
          })
        })
      }
      else{
        this.archivoS.insert(this.archivo).subscribe(()=>{
            this.archivoS.list().subscribe(data=>{
              this.archivoS.setList(data)
            })
          })
      }
      this.router.navigate(['archivos'])
    }
  }
 init() {
  if (this.edicion) {
    this.archivoS.listId(this.id).subscribe(data => {
      setTimeout(() => {
        this.form.patchValue({
          codigo: data.id,
          nombre: data.nombreArchivo,
          fecha: this.convertirUTCaLocal(data.fechaSubida),
          nombreusuario: data.usuario.idUsuario,
          nombreasesoria:data.asesoria.idAsesoria,
          nombreformatoArchivo:data.formatoArchivo.id
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
