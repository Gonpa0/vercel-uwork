import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const lService=inject(LoginService)
    const router=inject(Router)

    const rpta=lService.verificar();

    if(!rpta){
      router.navigate(['/login']);
      return false;
    }
    //Verificacion por roles
    const expectectRoles: string[] = route.data['roles']; // roles permitidos en la ruta
    const userRole = lService.showRole(); // Rol actual

    if(expectectRoles && !expectectRoles.includes(userRole)) {

      router.navigate(['/unauthorized']); // Redirige si no tiene permisos
      return false;
    }
    return true; // Tiene acceso
};
