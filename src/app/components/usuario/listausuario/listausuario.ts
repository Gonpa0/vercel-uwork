import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-listausuario',
  imports: [MatTableModule,MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule],
  templateUrl: './listausuario.html',
  styleUrl: './listausuario.css'
})
export class Listausuario implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6', 'c7', 'c8','c9', 'c10', 'c11', 'c12'];

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS:UsuarioService){}
  
  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      
      this.uS.getList().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
    /*this.uS.list().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data)
    })*/
  }
  eliminar(id: number){
    this.uS.deleteU(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.uS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.uS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}
