import { Injectable } from '@angular/core';
import { UsernameSinPasswordDTO } from '../models/UsernameSinPasswordDTO';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsernamesinpassworddtoService {
  private url = `${base_url}/usuario`;
  private listaCambio = new Subject<UsernameSinPasswordDTO[]>();
  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<UsernameSinPasswordDTO[]>(`${this.url}/listarsinpassword`);
    }
  getList() {
        return this.listaCambio.asObservable();
      }
   setList(listaNueva:UsernameSinPasswordDTO[]) {
      this.listaCambio.next(listaNueva);
    }
}
