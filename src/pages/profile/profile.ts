import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Camera,Device } from 'ionic-native';
// import { LoginPage } from '../login/login';
// import { SupportPage } from '../support/support';
// import { UserData } from '../../providers/user-data';



@Component({
  selector: 'page-account',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username: string;
// , public userData: UserData
  constructor(public alertCtrl: AlertController, public nav: NavController) {

  }

  // ngAfterViewInit() {
  //   this.getUsername();
  // }
    ionViewDidLoad(){

   let userId = firebase.auth().currentUser.uid
  let user =  firebase.database().ref('/userProfile').child(userId).once('value', (_snapshot: any) => {
          _snapshot.forEach((_childSnapshot) => {
                 var element = _childSnapshot.val();
            console.log(element)
            })
      })
}

  

  updatePicture() {
   
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    // let alert = this.alertCtrl.create({
    //   title: 'Change Username',
    //   buttons: [
    //     'Cancel'
    //   ]
    // });
    // alert.addInput({
    //   name: 'username',
    //   value: this.username,
    //   placeholder: 'username'
    // });
    // alert.addButton({
    //   text: 'Ok',
    //   handler: (data: any) => {
    //     this.userData.setUsername(data.username);
    //     this.getUsername();
    //   }
    // });

    // alert.present();
  }

  getUsername() {
    // this.userData.getUsername().then((username) => {
    //   this.username = username;
    // });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    // this.userData.logout();
    // this.nav.setRoot(LoginPage);
  }

  support() {
    // this.nav.push(SupportPage);
  }
}
