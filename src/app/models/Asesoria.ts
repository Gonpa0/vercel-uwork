
import { Usuario } from "./Usuario"

export class Asesoria{
    idAsesoria: number=0
    nombreAsesoria: string=''
    fechaAsesoria: Date= new Date()
    usuarioInferior: Usuario = new Usuario()
    usuarioSuperior: Usuario = new Usuario()

}