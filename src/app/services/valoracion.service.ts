import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Valoracion } from '../models/Valoracion';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  private url = `${base_url}/valoracion`;
  private listaCambio = new Subject<Valoracion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Valoracion[]>(this.url);
  }
  insert(v:Valoracion) {
    return this.http.post(this.url, v);
  }
  setList(listaNueva:Valoracion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number) {
    return this.http.get<Valoracion>(`${this.url}/${id}`);
  }
  update(v:Valoracion) {
    return this.http.put(this.url, v);
  }
  deleteV(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
