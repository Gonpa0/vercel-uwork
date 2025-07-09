import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Archivo } from '../models/Archivo';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  private url = `${base_url}/archivo`
  private listaCambio =new Subject<Archivo[]>


  constructor(private h:HttpClient) { }

  list(){
      return this.h.get<Archivo[]>(this.url)
    }

  insert(archivo:Archivo){
      return this.h.post(this.url,archivo)
    }

  getList(){
        return this.listaCambio.asObservable()
      }

  setList(listaNueva:Archivo[]){
        this.listaCambio.next(listaNueva)
      }

   listId(id:number){
      return this.h.get<Archivo>(`${this.url}/${id}`)
    }

    update(archivo:Archivo){
      return this.h.put(this.url,archivo)
    }

     deleteArchivo(id:number){
    return this.h.delete(`${this.url}/${id}`)
  }


  //METODO PARA SubIR un archivo local desde el frontend y guarda sus metadatos (nombre, fecha, usuario, asesoría, formato) en la BD.

  subirArchivo(formData: FormData) {
  return this.h.post(`${this.url}/upload`, formData);
  }

  // Lista los archivos subidos para una asesoría específica (por idAsesoria) para mostrarlos en el chat.

  listarPorAsesoria(id: number) {
  return this.h.get<Archivo[]>(`${this.url}/asesoria/${id}`);
}
}
