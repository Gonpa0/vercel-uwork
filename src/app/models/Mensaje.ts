import { Asesoria } from './Asesoria';
import { Usuario } from './Usuario';

export class Mensaje {
    idMensaje: number = 0;
    contenido: string = '';
    fechaMensaje: Date = new Date();
    orden: number = 0;
    usuario: Usuario = new Usuario();
    asesoria: Asesoria = new Asesoria();
}
