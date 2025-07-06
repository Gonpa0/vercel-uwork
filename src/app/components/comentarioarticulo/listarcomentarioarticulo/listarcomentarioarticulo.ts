import { Component, ViewChild } from '@angular/core';
import { ComentarioArticulo } from '../../../models/ComentarioArticulo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ComentarioarticuloService } from '../../../services/comentarioarticulo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarcomentarioarticulo',
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './listarcomentarioarticulo.html',
  styleUrl: './listarcomentarioarticulo.css'
})
export class Listarcomentarioarticulo {
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7'];
  dataSource:MatTableDataSource<ComentarioArticulo>=new MatTableDataSource()
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private comentarioarticuloS:ComentarioarticuloService){
  }

  ngOnInit(): void {
      this.comentarioarticuloS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.comentarioarticuloS.getList().subscribe(data=>{
        // Actualizamos solo los datos para no romper el enlace con la tabla HTML.
        // Así la tabla se refresca automáticamente sin recrearla.
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  } /*this.dataSource= new MatTableDataSource(data) <= No funciona para actualizar automaticamente cuando hago new MatTableDataSource(data)*/

  eliminar(id:number){
    this.comentarioarticuloS.deleteComentarioArticulo(id).subscribe(data=>{
      console.log('Eliminado:', data); /* Para ver si funciona el metodo delete en consola */
      this.comentarioarticuloS.list().subscribe(data=>{
         console.log('Lista recargada:', data); /* Para ver si actualiza la lista al hacer el delete en consola */
        this.comentarioarticuloS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}
