import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Articulo } from '../../../models/Articulo';
import { ArticuloService } from '../../../services/articulo.service';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listararticulo',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginator,
    CommonModule
  ],
  templateUrl: './listararticulo.html',
  styleUrl: './listararticulo.css'
})

export class Listararticulo implements OnInit {
  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  displayedColumns: string[] = this.publicColumns;

  dataSource: MatTableDataSource<Articulo> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private articuloS: ArticuloService, private loginService: LoginService) {}

  ngOnInit(): void {
    // Cargar artículos
    this.articuloS.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.articuloS.getList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

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
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR' ||  this.rolUsuario === 'ESTUDIANTESUPERIOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }

  eliminar(id: number) {
    this.articuloS.deleteArticulo(id).subscribe(() => {
      this.articuloS.list().subscribe(data => {
        this.articuloS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
