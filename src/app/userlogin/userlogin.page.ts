import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import User from '../models/User/User.interface';
// - import AngularFireAuth
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.page.html',
  styleUrls: ['./userlogin.page.scss'],
})
export class UserloginPage implements OnInit {

  public user = {} as User;

  constructor(
    private navCtrl: NavController,
    private auth: AngularFireAuth
  ) { }


  loginUser(user: User){

    if(user.email.trim().length == 0 || user.password.trim().length == 0){
        // use toaster ..
        //all fields are required
    }else{

      // this.auth.sendPasswordResetEmail(user.email).then((result) => {
      //     console.log("Sends password reset ", result);
      // })

      this.auth.signInWithEmailAndPassword(user.email, user.password).then(( data ) => {

        this.navCtrl.navigateRoot("/home");

        // working

      })


    }


  }





  welcomePage(){

    this.navCtrl.navigateBack("/welcome");

  }

  
  ngOnInit() {
  }

}
