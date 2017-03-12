import { Component , ViewChild } from '@angular/core';
import { NavController , ModalController , ViewController } from 'ionic-angular';
import { Geolocation} from 'ionic-native'
import {googlemaps} from 'googlemaps'; 
import { InfoModalPage } from '../info-modal/info-modal';
import { AuthData } from  '../../providers/auth-data';
import {LoginPage} from '../login/login';
import  {SignupPage} from '../signup/signup';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('map') mapElement;
    map: any;
    assetCollection
  constructor(public navCtrl: NavController , public modalCtrl: ModalController , public authData:AuthData) {
  }
  ionViewDidLoad(){
    this.loadMap()
    this.loadData()
  }


   addInfoWindow(marker, message) {

            let infoWindow = new google.maps.InfoWindow({
                content: "<img src ="+message+"/>"
            });

            google.maps.event.addListener(marker, 'click',  ()=> {
                infoWindow.open(this.map, marker);
            });
        }
 


  loadData() {
    var result = [];
    // load data from firebase...
    firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;

        result.push(element);
      });

     this.assetCollection =  result

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

      for(let mark of this.assetCollection){
             let marker = new google.maps.Marker({
                 map: this.map,
               animation: google.maps.Animation.DROP,
                position: {lat:mark.latitude,lng:mark.longitude}
                 });
              // adding ifoWindow ...          
      this.addInfoWindow(marker,mark.URL);
           }

    
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




