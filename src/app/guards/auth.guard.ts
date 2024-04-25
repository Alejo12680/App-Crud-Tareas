import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TaskingService } from 'src/app/services/tasking.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private taskingService: TaskingService,
    private router: Router,
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Metodo de autenticacion consumiendo el servicio
    let token = localStorage.getItem('token');

    if (!token) {
      return this.router.createUrlTree(['/login']);
    }

    return this.taskingService.autenticacion(token).pipe(

      // El usuario si existe
      map((res: any) => {
        if (res) {
          console.log(res);
          
          return true;

        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    )
  }

}
