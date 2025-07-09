import { Usuario } from "./Usuario"

export class Articulo {


  idArticulo:number=0
  titulo:string=""
  contenido:string=""
  fecha:Date=new Date()
  autor:string=""
  //RELACION CON LA TABLA USUARIO O MODELO USUARIO
  usuario:Usuario = new Usuario()

}
