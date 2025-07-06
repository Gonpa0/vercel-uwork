import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { ComentarioArticulo } from '../models/ComentarioArticulo';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ComentarioarticuloService {

  private url = `${base_url}/comentariosarticulo`
  private listaCambio=new Subject<ComentarioArticulo[]>


  constructor(private h:HttpClient) { }

  list(){
      return this.h.get<ComentarioArticulo[]>(this.url)
    }

  insert(comentarioArticulo:ComentarioArticulo){
      return this.h.post(this.url,comentarioArticulo)
    }

  getList(){
        return this.listaCambio.asObservable()
      }

  setList(listaNueva:ComentarioArticulo[]){
        this.listaCambio.next(listaNueva)
      }

   listId(id:number){
      return this.h.get<ComentarioArticulo>(`${this.url}/${id}`)
    }

    update(comentarioArticulo:ComentarioArticulo){
      return this.h.put(this.url,comentarioArticulo)
    }

     deleteComentarioArticulo(id:number){
    return this.h.delete(`${this.url}/${id}`)
  }

}
