import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // Servicio observable
  public modeDark = new BehaviorSubject(false);

  constructor() { }

  // Servicio que cambia el estado del tema de color
  setTheme(darkMode: boolean) {
    if (darkMode) {
      document.body.setAttribute('color-theme', 'dark');

    } else {
      document.body.setAttribute('color-theme', 'light');
    }

    // Esta es la variable que escucha los cambios del observable, si cambia el valor del dark mode aca se va reflejar en todo el servicio.
    this.modeDark.next(darkMode);

    // Guardamos el resultado en el local storage, ademas de guardarlo como un string ya que es un boolean
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }

  // Servicio que guarda el tema de color que eligio el usuario 
  setThemeUsuario() {
    // Obtener el valor del tema del almacenamiento local
    let storedTheme = localStorage.getItem('darkMode');

    // Verificar si el valor recuperado no es null
    if (storedTheme !== null) {

        // Convertir el valor almacenado a booleano
        let darkMode = JSON.parse(storedTheme);

        // Verificar si darkMode es true o false y establecer el tema correspondiente
        if (darkMode) {
            this.setTheme(darkMode);

        } else {
            this.setTheme(darkMode);
        }
    } else {
        // Si el valor almacenado es null, establece un el tema predeterminado light
        document.body.setAttribute('color-theme', 'light');
    }
  }
}
