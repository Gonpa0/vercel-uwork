import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormatoArchivo } from '../../../models/FormatoArchivo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormatoarchivoService } from '../../../services/formatoarchivo.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.html',
  providers: [provideNativeDateAdapter()],

  styleUrl: './insertareditar.css'
})
export class Insertareditar implements OnInit{
  form:FormGroup = new FormGroup({})
  formatoarchivo:FormatoArchivo = new FormatoArchivo()

  id:number = 0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private faS:FormatoarchivoService,
    private router:Router) {}

  ngOnInit(): void {

    //PRIMERO DEFINIMOS EL FORMULARIO PARA REGISTRAR FORMATOARCHIVO
        this.form=this.formBuilder.group({
        codigo:[0], /* [''], */ //ASIGNAMOS 0 PARA QUE SE ENVIE AUTOMATICAMENTE SIN ASIGNAR AL MOMENTO DE REGISTRAR
        formatodelarchivo:['',Validators.required],
        extensionarchivo:['',Validators.required],
      })
       // VERIFICA SI ES EDICION y carga los datos
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id']
        this.edicion=data['id']!=null
        this.init()
      })
  }

    aceptar(){
    if(this.form.valid){
      this.formatoarchivo.id = this.form.value.codigo
      this.formatoarchivo.formatoArchivo = this.form.value.formatodelarchivo
      this.formatoarchivo.extension=this.form.value.extensionarchivo

      if(this.edicion) {
        this.faS.update(this.formatoarchivo).subscribe(data=>{
          this.faS.list().subscribe(data=>{
            this.faS.setList(data)
          })
        })
      }
      else {
          this.faS.insert(this.formatoarchivo).subscribe(()=>{
            this.faS.list().subscribe(data=>{
              this.faS.setList(data)
            })
          })
      }
        this.router.navigate(['formatoarchivos'])
    }
  }

   init(){
    if(this.edicion){
      this.faS.listId(this.id).subscribe(data=>{
       /* this.form=new FormGroup({ // new FormGroup(...) = creas un formulario desde cero (rompe el flujo si ya existe).
          codigo:new FormControl(data.id),
          formatodelarchivo:new FormControl(data.formatoArchivo),
          extensionarchivo:new FormControl(data.extension)
        }) */
        this.form.patchValue({ //this.form.patchValue para evitar romper el vínculo del formulario, llenando los valores del formulario que ya existe.
          codigo:data.id,
          formatodelarchivo: data.formatoArchivo,
          extensionarchivo: data.extension
        })
      })
    }
  }
}
