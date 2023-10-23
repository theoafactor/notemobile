import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private loader: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    this.loadingCtrl.create({
      message: "Please wait ...",
      showBackdrop: true
    }).then(( loader ) => {

      this.loader = loader;

      this.loader.present(); //start the loader

    })
   


  }



  async getStarted(){

    const result = await this.navCtrl.navigateForward("welcome")
    
    if(result){
      this.loader.dismiss();
      const toaster = await this.toastCtrl.create({
        message: "Welcome to Note Takr!",
        duration: 3000,
        position: "bottom"
      })

      toaster.present();


    }
   

  }
}
