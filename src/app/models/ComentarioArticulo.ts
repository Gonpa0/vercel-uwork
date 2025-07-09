import { Articulo } from "./Articulo"
import { Usuario } from "./Usuario"

export class ComentarioArticulo{
  idComentario:number=0
  contenido:string=""
  fecha:Date= new Date()
  articulo:Articulo = new Articulo()
  usuario:Usuario = new Usuario()


}
