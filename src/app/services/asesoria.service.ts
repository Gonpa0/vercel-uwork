import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Asesoria } from '../models/Asesoria';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  private url = `${base_url}/asesoria`;
    private listaCambio = new Subject<Asesoria[]>();

  constructor(private http: HttpClient) { }
    list() {
      return this.http.get<Asesoria[]>(this.url);
    }
    insert(a:Asesoria) {
      return this.http.post(this.url, a);
    }
    setList(listaNueva:Asesoria[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    listId(id:number) {
      return this.http.get<Asesoria>(`${this.url}/${id}`);
    }
    update(a:Asesoria) {
      return this.http.put(this.url, a);
    }
    deleteA(id:number) {
      return this.http.delete(`${this.url}/${id}`);
    }

    listarPorUsuario(idUsuario: number) {
    return this.http.get<Asesoria[]>(`${this.url}/usuario/${idUsuario}`);
    }

}
