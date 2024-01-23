import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private loader: any;

  public image_link: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    this.loadingCtrl.create({
      message: "Please wait ...",
      showBackdrop: true
    }).then(( loader ) => {

      this.loader = loader;

      this.loader.present(); //start the loader


      this.loader.dismiss()
    })
   


  }



  async getStarted(){

      const image = await Camera.getPhoto({
        quality: 90, 
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        direction: CameraDirection.Front
      })



      //save the image for previewing 
      this.image_link = image.webPath;

      console.log(this.image_link)
   

  }
}
