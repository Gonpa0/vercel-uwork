import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormatoArchivo } from '../models/FormatoArchivo';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class FormatoarchivoService {
  private url = `${base_url}/formatoArchivo`
  private listaCambio=new Subject<FormatoArchivo[]>

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<FormatoArchivo[]>(this.url)
  }


  insert(fA:FormatoArchivo){
    return this.http.post(this.url,fA)
  }
  setList(listaNueva:FormatoArchivo[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<FormatoArchivo>(`${this.url}/${id}`)
  }

  update(fA:FormatoArchivo){
    return this.http.put(this.url,fA)
  }

  deletefA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
