import { Rol } from '../models/Rol';
export class UsernameSinPasswordDTO {
    idUsuario: number = 0;
    username: string = '';
    correo: string = '';
    ciclo: number = 0;
    puntos: number = 0;
    carrera: string = '';
    centro_de_estudios: string = '';
    rol: Rol = new Rol();
    estado: boolean = false; 
}
