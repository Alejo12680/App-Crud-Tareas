/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskingService } from 'src/app/services/tasking.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private taskingService: TaskingService,
    private toastSvc: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.taskingService.cerrarSesion();
    this.toastSvc.presentToast({position: 'top', message: 'Cerrando Sesión', color: 'success', duration: 5000, icon: 'alert-circle-outline'})
    this.router.navigate(['/tabs'])
  }

}
