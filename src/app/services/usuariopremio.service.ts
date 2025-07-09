import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { UsuarioPremio } from '../models/UsuarioPremio';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuariopremioService {
  private url = `${base_url}/usuariopremio`;
  private listaCambio = new Subject<UsuarioPremio[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<UsuarioPremio[]>(this.url);
  }
  insert(up:UsuarioPremio) {
    return this.http.post(this.url, up);
  }
  setList(listaNueva:UsuarioPremio[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number) {
    return this.http.get<UsuarioPremio>(`${this.url}/${id}`);
  }
  update(up:UsuarioPremio) {
    return this.http.put(this.url, up);
  }
  deleteUP(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
