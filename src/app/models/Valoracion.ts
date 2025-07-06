
import { Asesoria } from "./Asesoria"
import { Usuario } from "./Usuario"

export class Valoracion{
    idValoracion: number = 0
    calificacion: number = 0
    asesoria: Asesoria = new Asesoria()
    usuario: Usuario = new Usuario()

}