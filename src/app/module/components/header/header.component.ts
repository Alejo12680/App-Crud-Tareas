/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  // Resive una propiedades, para poder Reutilizar el componente, con el metodo Input, el ? sirve para iniciarla en vacio y evitar el error, tambien se puede quitar en tsconfig.json con el "strict": pasarlo a (false) o colocar el '| undefined'.
  @Input() title: string | undefined;
  @Input() backButton: string | undefined;
  @Input() isModal: boolean | undefined;
  @Input() color: string | undefined;
  @Input() centerTitle: boolean | undefined;
  
  public darkModel: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  // Para cambiar el color realmente hay que irse a 'theme/variables.css/ y borramos la propiedad @media (prefers-color-scheme: dark) para pegar en los bodys esto [color-theme="darck"]
  setColor(darkModel: boolean) {
    this.darkModel = darkModel;
  }

}
