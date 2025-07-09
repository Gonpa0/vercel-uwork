import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsuarioPremio } from '../../../models/UsuarioPremio';
import { UsuariopremioService } from '../../../services/usuariopremio.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listausuariopremio',
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule, MatPaginatorModule, CommonModule],
  templateUrl: './listausuariopremio.html',
  styleUrl: './listausuariopremio.css'
})
export class Listausuariopremio implements OnInit{
    allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  publicColumns: string[] = ['c1', 'c2', 'c3'];
  displayedColumns: string[] = this.publicColumns;

  dataSource: MatTableDataSource<UsuarioPremio> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private upS:UsuariopremioService, private loginService:LoginService ){}

  ngOnInit(): void {
      this.upS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.upS.getList().subscribe(data=>{
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


  eliminar(id:number){
    this.upS.deleteUP(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.upS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.upS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}
