import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import User from '../models/User/User.interface';
import UserBackend from 'src/backends/UserBackend';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public user = {} as User;

  public userBackend: any;
 

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController ) {
      
    this.userBackend = new UserBackend()

   }

  ngOnInit() {
  }



  createAccount(user: User){



    if(typeof user.firstname == "undefined" || typeof user.lastname === "undefined" || typeof user.email === "undefined" || typeof user.password === "undefined" || typeof user.password_confirm === "undefined"){
      // the user needs to enter all information
      this.toastCtrl.create({
        message: "Please fill all fields!",
        duration: 3000,
        position: "top"
      }).then((toaster) => {
        toaster.present();
      })
    }
    else{
      // start the spinner
      this.loadingCtrl.create({
        message: "Creating Account ...",
      })
      this.userBackend.registerUserAccount(user)

    }




  }

}
