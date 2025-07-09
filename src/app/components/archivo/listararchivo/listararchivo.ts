import { Component, ViewChild } from '@angular/core';
import { Archivo } from '../../../models/Archivo';
import { MatPaginator } from '@angular/material/paginator';
import { ArchivoService } from '../../../services/archivo.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listararchivo',
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginator,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './listararchivo.html',
  styleUrl: './listararchivo.css'
})
export class Listararchivo {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8'];
  dataSource:MatTableDataSource<Archivo>=new MatTableDataSource()
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private archivoS:ArchivoService){
  }

  ngOnInit(): void {
      this.archivoS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.archivoS.getList().subscribe(data=>{
        // Actualizamos solo los datos para no romper el enlace con la tabla HTML.
        // Así la tabla se refresca automáticamente sin recrearla.
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  } /*this.dataSource= new MatTableDataSource(data) <= No funciona para actualizar automaticamente cuando hago new MatTableDataSource(data)*/

  eliminar(id:number){
    this.archivoS.deleteArchivo(id).subscribe(data=>{
      console.log('Eliminado:', data); /* Para ver si funciona el metodo delete en consola */
      this.archivoS.list().subscribe(data=>{
         console.log('Lista recargada:', data); /* Para ver si actualiza la lista al hacer el delete en consola */
        this.archivoS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}

