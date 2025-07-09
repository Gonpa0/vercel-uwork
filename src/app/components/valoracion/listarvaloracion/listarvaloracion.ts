
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Valoracion } from '../../../models/Valoracion';
import { ValoracionService } from '../../../services/valoracion.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listarvaloracion',
  imports: [MatTableModule,MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule, CommonModule],
  templateUrl: './listarvaloracion.html',
  styleUrl: './listarvaloracion.css'
})
export class Listarvaloracion implements OnInit{

     allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];
  publicColumns: string[] = ['c1', 'c2', 'c3','c4'];
  displayedColumns: string[] = this.publicColumns;


  dataSource: MatTableDataSource<Valoracion> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private vS:ValoracionService, private loginService:LoginService){}
  ngOnInit(): void {
      this.vS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })

      this.vS.getList().subscribe(data=>{
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
  }

verificarAcceso() {
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }


  eliminar(id: number){
    this.vS.deleteV(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.vS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.vS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}
