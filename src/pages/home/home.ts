import { Component , ViewChild } from '@angular/core';
import { NavController , ModalController , ViewController } from 'ionic-angular';
import { Geolocation} from 'ionic-native'
import {googlemaps} from 'googlemaps'; 
import { InfoModalPage } from '../info-modal/info-modal';
import { AuthData } from  '../../providers/auth-data';
import {LoginPage} from '../login/login';
import  {SignupPage} from '../signup/signup';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('map') mapElement;
    map: any;
  constructor(public navCtrl: NavController , public modalCtrl: ModalController , public authData:AuthData) {
  }
  ionViewDidLoad(){
    this.loadMap()
  }

  addInfoWindow(marker){
   google.maps.event.addListener(marker, 'click', () => {
     let infoWindow = this.modalCtrl.create(InfoModalPage);
      infoWindow.present();
  });
 
}
 loadMap(){
 
    Geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //adding marker...
       let marker = new google.maps.Marker({
           map: this.map,
         animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
           });

      //adding ifoWindow ...          
      this.addInfoWindow(marker);
    }, (err) => {
      console.log(err);
    });
 
  }
  logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}
 
}




