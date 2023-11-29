import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import User from '../models/User/User.interface';
import UserBackend from 'src/backends/UserBackend';

// - import AngularFireAuth
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';


// bring in firebase email auth provider
import { EmailAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public user = {} as User;

  public userBackend: any;
 

  constructor(private navCtl: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController,
              private auth: AngularFireAuth,
              private db: AngularFirestore
    ) {
      
    this.userBackend = new UserBackend()

   }

  ngOnInit() {
  }



  async createAccount(user: User){



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
      let loader = await this.loadingCtrl.create({
        message: "Creating Account ....",
      })
      // this.userBackend.registerUserAccount(user)



      // EmailAuthProvider.credential(user.email, user.password);
      loader.present();

    
      this.auth.createUserWithEmailAndPassword(user.email, user.password).then( async ( user_data) => {

        console.log("User created successfully!", user_data)

        this.toastCtrl.create({
          message: "User created successfully",
          duration: 3000,
          position: "top"
        }).then( async ( toaster) => {
          toaster.present();
          loader.dismiss();

          this.user = {} as User;

    
          // save the new user to the database
          let user_uid = user_data.user?.uid;
         this.db.collection("users").doc(user_uid).set({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              phone: null,
              home_address: null
            
          }).then(() => {
            // navigate to the login page
            this.navCtl.navigateForward("/userlogin").then(() => {

            })
          })

     

      

         

        })

        

      });

    }




  }

}
