import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
// this one for the auth components 
import { Auth } from '../providers/auth';
//this one is for showing loding ... message 
import { LoadingController } from 'ionic-angular';

// @Component({
//   templateUrl: 'app.html'
// })
// export class MyApp {
//  // by defult it will be the log in page unless he is logged in 
//   rootPage: any = LoginPage;
//   loader: any;
// // we will inject the component
//   constructor(public auth: Auth,   public loadingCtrl: LoadingController )  {
//     this.presentLoading();
//     // we will cheak if the user is auth or not 
//       this.auth.login().then((isLogedin) => {
//       // if it auth render the tabs page 
//         if(isLogedin){
//           this.rootPage = TabsPage;
//         }else {
//           //if not let him sign in first 
//           this.rootPage = LoginPage;
//         }

//         this.loader.dismiss();
//      });
//   }

//     presentLoading() {
//     this.loader = this.loadingCtrl.create({
//       content: "Please wait...",
//     });
//     this.loader.present();
//   }




// }
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}