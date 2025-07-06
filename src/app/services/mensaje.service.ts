import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Mensaje } from '../models/Mensaje';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url = `${base_url}/mensaje`;
  private listaCambio = new Subject<Mensaje[]>();
  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<Mensaje[]>(this.url);
    }
    insert(mensaje: any) {
    return this.http.post(`${base_url}/mensaje`, mensaje);
    }
    setList(listaNueva:Mensaje[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    listId(id:number) {
      return this.http.get<Mensaje>(`${this.url}/${id}`);
    }

    //metodo del para implementar el chat asesoria
    listarMensajesPorAsesoria(idAsesoria: number) {
    return this.http.get<Mensaje[]>(`${this.url}/asesoria/${idAsesoria}`);
    }

    update(m:Mensaje) {
      return this.http.put(this.url, m);
    }
    deleteM(id:number) {
      return this.http.delete(`${this.url}/${id}`);
    }

}
