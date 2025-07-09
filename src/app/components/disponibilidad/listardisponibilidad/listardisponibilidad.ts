import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Disponibilidad } from '../../../models/Disponibilidad';
import { DisponibilidadService } from '../../../services/disponibilidad.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listardisponibilidad',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './listardisponibilidad.html',
  styleUrl: './listardisponibilidad.css'
})
export class Listardisponibilidad {

  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  displayedColumns: string[] = this.publicColumns;



  dataSource:MatTableDataSource<Disponibilidad>=new MatTableDataSource()
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    isLoggedIn: boolean = false;
    rolUsuario: string = '';


  constructor(private disponibilidadS:DisponibilidadService, private loginService:LoginService){
  }

  ngOnInit(): void {
      this.disponibilidadS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.disponibilidadS.getList().subscribe(data=>{
        // Actualizamos solo los datos para no romper el enlace con la tabla HTML.
        // Así la tabla se refresca automáticamente sin recrearla.
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })

       // Escuchar estado de sesión
    this.loginService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.verificarAcceso();
    });

    // Escuchar rol de usuario
    this.loginService.userRol$.subscribe(rol => {
      this.rolUsuario = rol;
      this.verificarAcceso();
    });

  } /*this.dataSource= new MatTableDataSource(data) <= No funciona para actualizar automaticamente cuando hago new MatTableDataSource(data)*/

  verificarAcceso() {
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR' || this.rolUsuario === 'ESTUDIANTESUPERIOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }


  eliminar(id:number){
    this.disponibilidadS.deleteDisponibilidad(id).subscribe(data=>{
      console.log('Eliminado:', data); /* Para ver si funciona el metodo delete en consola */
      this.disponibilidadS.list().subscribe(data=>{
         console.log('Lista recargada:', data); /* Para ver si actualiza la lista al hacer el delete en consola */
        this.disponibilidadS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}
