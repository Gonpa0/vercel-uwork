import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Asesoria } from '../../../models/Asesoria';
import { AsesoriaService } from '../../../services/asesoria.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarasesoria',
  imports: [MatTableModule,MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule, CommonModule],
  templateUrl: './listarasesoria.html',
  styleUrl: './listarasesoria.css'
})

export class Listarasesoria implements OnInit {

  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c8'];
  displayedColumns: string[] = this.publicColumns;

  dataSource: MatTableDataSource<Asesoria> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';
  idUsuario: number | null = null;

  constructor(
    private aS: AsesoriaService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.loginService.getIdUsuario();
    console.log("ID USUARIO EN LOGIN:", this.idUsuario);
    // Escuchar estado de sesión
    this.loginService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.verificarAcceso();
    });

    // Escuchar rol de usuario y cargar asesorías
    this.loginService.userRol$.subscribe(rol => {
      this.rolUsuario = rol;
      this.verificarAcceso();

      if (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR') {
        this.aS.list().subscribe(data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        });
      } else if (this.idUsuario !== null) {
        this.aS.listarPorUsuario(this.idUsuario).subscribe(data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  verificarAcceso() {
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }

  eliminar(id: number) {
    this.aS.deleteA(id).subscribe(() => {
      if (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'DESARROLLADOR') {
        this.aS.list().subscribe(data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        });
      } else if (this.idUsuario !== null) {
        this.aS.listarPorUsuario(this.idUsuario).subscribe(data => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }
}




























/*export class Listarasesoria implements OnInit{

  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','c8'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c8'];
  displayedColumns: string[] = this.publicColumns;


  dataSource: MatTableDataSource<Asesoria> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private aS:AsesoriaService, private loginService:LoginService){}


  ngOnInit(): void {

    const idUsuario = this.loginService.getIdUsuario();


    this.aS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })

      this.aS.getList().subscribe(data=>{
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
    this.aS.deleteA(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.aS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.aS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}*/
