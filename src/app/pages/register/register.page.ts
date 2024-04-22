/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custion-validators';
import { TaskingService } from '../../services/tasking.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Se configura para volverlo un formulario reactivo
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl(''),
        
  });

  constructor(
    private taskingService: TaskingService,
    private router: Router,
    private toastSvc: ToastService,
    private loadingSvc: LoadingService,
  ) { }


  ngOnInit() {
    this.confirmPasswordValidators();
  }

  // Funcion del valideitor que se hizo personalizado, compara las contraseñas si son iguales o no son iguales
  confirmPasswordValidators() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])

    // Actualizacion de los validadores
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  // Funcion del formulario para crear el usuario
  creacionUser() {
    if (this.form.valid) {
      console.log(this.form.value);  
      this.loadingSvc.presentLoading({message: 'Registrando...'});

      let estructura = {
        "nombre": this.form.value.name,
        "correo": this.form.value.email,
        "contraseña": this.form.value.password,
      }

      //Llamado de los datos en la función de consumir servicios
      this.servicioCrearUser(estructura);

    } else {
      this.toastSvc.presentToast({position: 'top', message: 'Por favor verifique los campos', color: 'danger', duration: 3000})
      this.loadingSvc.dismissLoading();

      //Funcion para marcar todas las casillas antes de enviar y saber cual falta
      this.form.markAllAsTouched(); 
    }
  }

  //Obtiene el servicio para la creacion de Usuario con el metodo POST
  servicioCrearUser(estructura: object) {

    this.taskingService.crearUsuario(estructura).subscribe({
      next: (res: any) => {
        this.toastSvc.presentToast({position: 'top', message: res.message, color: 'success', duration: 3000})
        this.router.navigate(['/login'])
        // Reset de Formulario
        this.form.reset();  
        this.loadingSvc.dismissLoading();    

      },
      error: (err: any) => {
        if (err.status === 0) {
          this.toastSvc.presentToast({position: 'top', message: 'Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo más tarde.', color: 'danger', duration: 5000})
          
        } else
        this.toastSvc.presentToast({position: 'top', message: err.error.message || 'Ha ocurrido un error. Por favor, intenta de nuevo más tarde.', color: 'danger', duration: 5000})

        this.loadingSvc.dismissLoading();
      }
    });
  }
}
