import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Premio } from '../models/Premio';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PremioServices {
  private url = `${base_url}/premios`;
  private listaCambio = new Subject<Premio[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Premio[]>(this.url);
  }
  insert(p:Premio) {
    return this.http.post(this.url, p);
  }
  setList(listaNueva:Premio[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number) {
    return this.http.get<Premio>(`${this.url}/${id}`);
  }
  update(p:Premio) {
    return this.http.put(this.url, p);
  }
  deleteP(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

