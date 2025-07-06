import { Usuario } from "./Usuario"

export class Notificacion {
  idNotificacion:number = 0
  contenido:string=""
  ledio:boolean=false
  fechaNotificacion: Date = new Date()
  usuario:Usuario = new Usuario()
}
