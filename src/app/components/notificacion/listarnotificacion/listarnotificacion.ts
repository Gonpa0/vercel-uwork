import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarnotificacion',
  imports: [MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './listarnotificacion.html',
  styleUrl: './listarnotificacion.css'
})
export class Listarnotificacion {

     allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  displayedColumns: string[] = this.publicColumns;


  dataSource:MatTableDataSource<Notificacion>=new MatTableDataSource()
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
    rolUsuario: string = '';

  constructor(private notificacionS:NotificacionService, private loginService:LoginService){
  }

  ngOnInit(): void {
      this.notificacionS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.notificacionS.getList().subscribe(data=>{
        // Actualizamos solo los datos para no romper el enlace con la tabla HTML.
        // Así la tabla se refresca automáticamente sin crearla de nuevo.
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
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }


  eliminar(id:number){
    this.notificacionS.deleteNotificacion(id).subscribe(data=>{
      console.log('Eliminado:', data); /* Para ver si funciona el metodo delete en consola */
      this.notificacionS.list().subscribe(data=>{
         console.log('Lista recargada:', data); /* Para ver si actualiza la lista al hacer el delete en consola */
        this.notificacionS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}
