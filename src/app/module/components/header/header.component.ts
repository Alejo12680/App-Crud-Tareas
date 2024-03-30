/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  // Resive una propiedades, para poder Reutilizar el componente, con el metodo Input, el ! sirve para iniciarla en vacio y evitar el error, tambien se puede quitar en tsconfig.json con el "strict": pasarlo a (false) o colocar el '| undefined'.
  @Input() title: string | undefined;
  @Input() backButton: string | undefined;
  @Input() isModal: boolean | undefined;
  @Input() color: string | undefined;
  @Input() centerTitle: boolean | undefined;
  
  public darkModel: BehaviorSubject<boolean>;

  constructor(
    private themeSvc: ThemeService
  ) { 
    // Inicializamos la varible darkModel en el constructor para que no tenga un error en la inicializacion del BehaviorSubject
    this.darkModel = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    // Enlazamos las variables del servicio observable BehaviorSubject
    this.darkModel = this.themeSvc.modeDark;
  }

  // Para cambiar el color realmente hay que irse a 'theme/variables.css/ y borramos la propiedad @media (prefers-color-scheme: dark) para pegar en los bodys esto [color-theme="dark"]
  /* setColor(darkModel: boolean) {
    this.darkModel = darkModel;
  } */

  // En esta funcion se escucha el servicio BehaviorSubject y lo cambiamos
  setColor(darkModel: boolean) {
    this.themeSvc.setTheme(darkModel);
  }

}
