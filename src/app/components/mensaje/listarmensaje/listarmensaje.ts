import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MensajeService } from '../../../services/mensaje.service';
import { Mensaje } from '../../../models/Mensaje';

@Component({
  selector: 'app-listarmensaje',
  imports: [MatTableModule,MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule],
  templateUrl: './listarmensaje.html',
  styleUrl: './listarmensaje.css'
})
export class Listarmensaje implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6', 'c7', 'c8'];
  
  dataSource: MatTableDataSource<Mensaje> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private mS:MensajeService){}

  ngOnInit(): void {
      this.mS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      
      this.mS.getList().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  }
  eliminar(id: number){
    this.mS.deleteM(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.mS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.mS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
} 
