import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Disponibilidad } from '../../../models/Disponibilidad';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisponibilidadService } from '../../../services/disponibilidad.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-insertareditardisponibilidad',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './insertareditardisponibilidad.html',
    providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditardisponibilidad.css'
})
export class Insertareditardisponibilidad implements OnInit {

  form: FormGroup = new FormGroup({});
  disponibilidad: Disponibilidad = new Disponibilidad();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private disponibilidadS: DisponibilidadService,
    private usuarioS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [0],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required], // Campo agregado
      horaFin: ['', Validators.required],     // Campo agregado
      nombreusuario: ['', Validators.required]
    });

    this.usuarioS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.disponibilidad.idDisponibilidad = this.form.value.codigo;
      this.disponibilidad.fechaDisponibilidad = this.form.value.fecha;
      this.disponibilidad.horaInicio = this.form.value.horaInicio; // Formato string tipo "HH:mm"
      this.disponibilidad.horaFin = this.form.value.horaFin;
      this.disponibilidad.usuario.idUsuario = this.form.value.nombreusuario;

      if (this.edicion) {
        this.disponibilidadS.update(this.disponibilidad).subscribe(() => {
          this.disponibilidadS.list().subscribe(data => {
            this.disponibilidadS.setList(data);
          });
        });
      } else {
        this.disponibilidadS.insert(this.disponibilidad).subscribe(() => {
          this.disponibilidadS.list().subscribe(data => {
            this.disponibilidadS.setList(data);
          });
        });
      }

      this.router.navigate(['disponibilidades']);
    }
  }

  init() {
    if (this.edicion) {
      this.disponibilidadS.listId(this.id).subscribe(data => {
        setTimeout(() => {
          this.form.patchValue({
            codigo: data.idDisponibilidad,
            fecha: this.convertirUTCaLocal(data.fechaDisponibilidad),
            horaInicio: data.horaInicio,
            horaFin: data.horaFin,
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
