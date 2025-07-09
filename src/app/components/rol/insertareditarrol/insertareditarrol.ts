import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-insertareditarrol',
  imports: [MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './insertareditarrol.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarrol.css'
})
export class Insertareditarrol implements OnInit{
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      codigo: [0],
      nombreRol: ['', Validators.required]
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo
      this.rol.nombreRol = this.form.value.nombreRol

      
      if (this.edicion) {
        this.rS.update(this.rol).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          })
        })
      }
      else{
        this.rS.insert(this.rol).subscribe(()=>{
            this.rS.list().subscribe(data=>{
              this.rS.setList(data)
            })
          })
      }
      this.router.navigate(['roles'])
    }
  }
  /*init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.idRol),
          nombreRol:new FormControl(data.nombreRol)
        }) 
      })
    }
  }*/
  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.idRol,
          nombreRol: data.nombreRol
        }) 
      })
    }
  }
}