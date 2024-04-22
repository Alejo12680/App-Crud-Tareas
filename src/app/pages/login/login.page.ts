/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { TaskingService } from 'src/app/services/tasking.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Se configura para volverlo un formulario reactivo
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private taskingService: TaskingService,
    private toastSvc: ToastService,
    private loadingSvc: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  // Funcion del formulario para ingreso del usuario login
  entryUser() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.loadingSvc.presentLoading({ message: 'Ingresando...' });

      let estructura = {
        "correo": this.form.value.email,
        "contraseña": this.form.value.password,
      }

      //Llamado de los datos en la función que consume los servicios
      this.servicioEntryUser(estructura);

    } else {
      this.toastSvc.presentToast({ position: 'top', message: 'Por favor verifique los campos', color: 'danger', duration: 3000 })
      this.loadingSvc.dismissLoading();
    }
  }

  //Obtiene el servicio para validar el Usuario con el metodo POST
  servicioEntryUser(estructura: object) {

    this.taskingService.login(estructura).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.data)
        localStorage.setItem('nombre', res.nombre)

        this.router.navigate(['/Inicio'])
        this.loadingSvc.dismissLoading();
      },
      error: (err: any) => {
        this.toastSvc.presentToast({position: 'top', message: err.error.message, color: 'danger', duration: 3000})
        this.loadingSvc.dismissLoading();
      }
    });
  }
}
