import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, Photo, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { AngularFireStorage } from "@angular/fire/compat/storage"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private loader: any;

  public image_link: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, 
  private storage: AngularFireStorage
    
    ) {

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
      this.image_link = await image.webPath;

      console.log(this.image_link)

      // convert to base64 
      let base64_image = await this.convertToBase64(image)

      console.log("base64 image: ", base64_image)


      const response = await fetch(image.webPath!)

      const blob = await response.blob();

      let storage_ref = this.storage.ref(`profile_photos/users_images`);
      
      storage_ref.put(blob).then(() => {
          console.log("Image uploaded...")

          storage_ref.getDownloadURL().subscribe(( url: any ) => {
              console.log("Download URL: ", url)
          })


      })

  }


  async convertToBase64(image: Photo){

    const blobData = await this.readAsBase64(image)

    return blobData;
  }

  async readAsBase64(image: Photo){
    const response = await fetch(image.webPath!)

    const blob = await response.blob();

    console.log("Blob: ", blob)

    return await this.convertBlobToBase64(blob) as string;

  }


  convertBlobToBase64(blob: Blob){
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onerror = reject;

      reader.onload = () => {
          resolve(reader.result)
      };

      reader.readAsDataURL(blob)
      
    })
  }



}
