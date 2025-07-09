import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Disponibilidad } from '../models/Disponibilidad';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService{

  private url = `${base_url}/disponibilidades`
  private listaCambio =new Subject<Disponibilidad[]>


  constructor(private h:HttpClient) { }

  list(){
      return this.h.get<Disponibilidad[]>(this.url)
    }

  insert(disponibilidad:Disponibilidad){
      return this.h.post(this.url,disponibilidad)
    }

  getList(){
        return this.listaCambio.asObservable()
      }

  setList(listaNueva:Disponibilidad[]){
        this.listaCambio.next(listaNueva)
      }

   listId(id:number){
      return this.h.get<Disponibilidad>(`${this.url}/${id}`)
    }

    update(disponibilidad:Disponibilidad){
      return this.h.put(this.url,disponibilidad)
    }

     deleteDisponibilidad(id:number){
    return this.h.delete(`${this.url}/${id}`)
  }

}

