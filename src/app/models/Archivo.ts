import { Asesoria } from "./Asesoria"
import { FormatoArchivo } from "./FormatoArchivo"
import { Usuario } from "./Usuario"


export class Archivo {
  id:number = 0
  nombreArchivo:string = ""
  fechaSubida:Date = new Date()
  usuario:Usuario =  new Usuario()
  asesoria:Asesoria = new Asesoria()
  formatoArchivo: FormatoArchivo = new FormatoArchivo()
}
