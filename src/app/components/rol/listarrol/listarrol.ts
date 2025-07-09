import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,MatPaginator,MatPaginatorModule],
  templateUrl: './listarrol.html',
  styleUrl: './listarrol.css',
})
export class Listarrol implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private rS: RolService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.rS.deleteR(id).subscribe((data) => {
      console.log('Eliminado:', data);
      this.rS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.rS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
