import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
  ) { }

  // Funsion para que se ejecute el Toast
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    await toast.present();
  }
}
