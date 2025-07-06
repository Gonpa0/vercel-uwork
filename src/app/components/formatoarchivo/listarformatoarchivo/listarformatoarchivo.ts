import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormatoArchivo } from '../../../models/FormatoArchivo';
import { FormatoarchivoService } from '../../../services/formatoarchivo.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listarformatoarchivo',
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule, MatPaginator],
  templateUrl: './listarformatoarchivo.html',
  styleUrl: './listarformatoarchivo.css'
})
export class Listarformatoarchivo implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  dataSource:MatTableDataSource<FormatoArchivo> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private faS:FormatoarchivoService){}

  ngOnInit(): void { //ACTUALIZADO
      this.faS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.faS.getList().subscribe(data=>{
        // Actualizamos solo los datos para no romper el enlace con la tabla HTML.
        // Así la tabla se refresca automáticamente sin recrearla.
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  } /*this.dataSource= new MatTableDataSource(data) <= No funciona para actualizar automaticamente cuando hago new MatTableDataSource(data)*/

  eliminar(id:number){ //ACTUALIZADO
    this.faS.deletefA(id).subscribe(data=>{
      console.log('Eliminado:', data); /* Para ver si funciona el metodo delete en consola */
      this.faS.list().subscribe(data=>{
         console.log('Lista recargada:', data); /* Para ver si actualiza la lista al hacer el delete en consola */
        this.faS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}
