import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/Notificacion';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarnotificacion',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './insertareditarnotificacion.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarnotificacion.css'
})
export class Insertareditarnotificacion implements OnInit{


  form:FormGroup = new FormGroup({})
  valorDefecto:boolean=false
  notificacion: Notificacion = new Notificacion()
  id:number=0
  edicion: boolean = false

  listaUsuarios: Usuario[]=[]


  constructor(
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private notificacionS: NotificacionService,
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
      estado: ['', Validators.required],
      fecha: ['', Validators.required],      // <-- fecha como Date
      hora: ['', Validators.required],       // <-- hora como string: "HH:mm"
      nombreusuario:['', Validators.required],
    })
    //PARA QUE SE MUESTRE LA LISTA DE USUARIOS EN EL MATSELECT
    this.usuarioS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
  }
  aceptar(){
    if (this.form.valid) {

        const fecha: Date = this.form.value.fecha;
        const hora: string = this.form.value.hora; // formato "HH:mm"
        const [hours, minutes] = hora.split(':').map(Number);

         // Crear nueva fecha con hora local explícitamente
    const fechaLocal = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      hours - 5, //pequeño artificio para que reste 5 horas
      minutes,
      0
    );


      this.notificacion.idNotificacion = this.form.value.codigo,
      this.notificacion.contenido= this.form.value.contenido,
      this.notificacion.ledio = this.form.value.estado,
      this.notificacion.fechaNotificacion = fechaLocal, //YA ES EL DATE CON HORA SE ENVIA DIRECTO LA VARIABLE sin form
      this.notificacion.usuario.idUsuario = this.form.value.nombreusuario

      if (this.edicion) {
        this.notificacionS.update(this.notificacion).subscribe(data=>{
          this.notificacionS.list().subscribe(data=>{
            this.notificacionS.setList(data)
          })
        })
      }
      else{
        this.notificacionS.insert(this.notificacion).subscribe(()=>{
            this.notificacionS.list().subscribe(data=>{
              this.notificacionS.setList(data)
            })
          })
      }
      this.router.navigate(['notificaciones'])
    }
  }
 init() {
  if (this.edicion) {
    this.notificacionS.listId(this.id).subscribe(data => {
       const fechaHora = new Date(data.fechaNotificacion);
        const hora = fechaHora.toTimeString().slice(0,5); // formato "HH:mm"
      setTimeout(() => {
        this.form.patchValue({
          codigo: data.idNotificacion,
          contenido: data.contenido,
          estado: data.ledio,
          fecha: fechaHora, //fecha
          hora: hora, //hora
          nombreusuario: data.usuario.idUsuario
        });
      });
    });
  }
}

}
