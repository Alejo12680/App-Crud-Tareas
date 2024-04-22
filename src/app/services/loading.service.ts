import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  // Activation de loading
  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  // Dismiss del loading
  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

}
