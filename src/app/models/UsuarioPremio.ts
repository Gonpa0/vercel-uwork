import { Usuario } from '../models/Usuario';
import { Premio } from '../models/Premio';

export class UsuarioPremio {
    id: number = 0;
    usuario: Usuario = new Usuario();
    premio: Premio = new Premio();
}
