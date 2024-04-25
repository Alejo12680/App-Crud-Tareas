import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TaskingService } from 'src/app/services/tasking.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private taskingService: TaskingService,
    private router: Router,
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Verificar si el usuario está autenticado
    let token = localStorage.getItem('token');

    if (token) {
      // Si el usuario está autenticado, redirigir a la página de inicio
      return this.router.createUrlTree(['/tabs/home']);
      
    } else {
      // Si el usuario no está autenticado, permitir el acceso a la página de inicio de sesión
      return true;
    }
  }
  
}
