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
import { Premio } from '../../../models/Premio';
import { PremioServices } from '../../../services/premio.service';

@Component({
  selector: 'app-insertareditarpremio',
  imports: [MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './insertareditarpremio.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarpremio.css'
})
export class Insertareditarpremio implements OnInit {
  form: FormGroup = new FormGroup({});
  premio: Premio = new Premio();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pS: PremioServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [0],
      categoria: ['', Validators.required],
      nombrePrem: ['', Validators.required],
      puntos: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.premio.id = this.form.value.codigo
      this.premio.categoria = this.form.value.categoria
      this.premio.nombrePrem = this.form.value.nombrePrem
      this.premio.puntos = this.form.value.puntos
      
      if (this.edicion) {
        this.pS.update(this.premio).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          })
        })
      }
      else{
        this.pS.insert(this.premio).subscribe(()=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            })
          })
      }
      this.router.navigate(['premios'])
    }
  }
  /*init(){
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          categoria: new FormControl(data.categoria),
          nombrePrem: new FormControl(data.nombrePrem),
          puntos: new FormControl(data.puntos)
        })
      })
    }
  }*/
  init(){
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.id,
          categoria: data.categoria,
          nombrePrem: data.nombrePrem,
          puntos: data.puntos,
        })
      })
    }
  }
}


