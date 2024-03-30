/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  // Estos inpust van a resivir las propiedades del formulario de login
  @Input() control!: FormControl;
  @Input() label: string | undefined;
  @Input() icon: string | undefined;
  @Input() type: string | undefined;
  @Input() autocomplete: string | undefined;

  public isPassword!: boolean;
  public hide: boolean = true;

  constructor() { }

  ngOnInit() {
    // Cuando se inicialice el componenete
    if (this.type == 'password') {
      this.isPassword = true;
    }
  }

  // Funcionalidad del ojo para ver la contraseña, cambiando el valor de la variable hide
  showHidePassword() {
    // Cambia el valor y viceversa
    this.hide = !this.hide;

    if (this.hide) {
      this.type = 'password';

    } else {
      this.type = 'text';

    }
  }

}
