import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PremioServices } from '../../../services/premio.service';
import { Premio } from '../../../models/Premio';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarpremio',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,MatPaginator,MatPaginatorModule, CommonModule],
  templateUrl: './listarpremio.html',
  styleUrl: './listarpremio.css',
})


export class Listarpremio implements OnInit {
  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  displayedColumns: string[] = [];

  dataSource: MatTableDataSource<Premio> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private pS: PremioServices, private loginService: LoginService) {}

  ngOnInit(): void {
    // ✅ Cargar datos de premios
    this.pS.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.pS.getList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    // ----Escuchar ambos estados: login y rol
    this.loginService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.actualizarColumnas(); // función que actualiza columnas
    });

    this.loginService.userRol$.subscribe(rol => {
      this.rolUsuario = rol;
      this.actualizarColumnas(); // función que actualiza columnas
    }); //----------------------------------------
  }

  // 🔹 Lógica para mostrar columnas según login y rol
  actualizarColumnas() {
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }

  eliminar(id: number) {
    this.pS.deleteP(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
