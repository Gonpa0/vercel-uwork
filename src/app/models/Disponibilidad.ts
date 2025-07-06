import { Usuario } from "./Usuario"

export class Disponibilidad {
  idDisponibilidad:number=0
  fechaDisponibilidad:Date = new Date()
  horaInicio:string=""
  horaFin:string=""
  usuario:Usuario=new Usuario()
}
