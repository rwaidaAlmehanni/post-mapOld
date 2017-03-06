import { Component , ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation} from 'ionic-native'
import {googlemaps} from 'googlemaps'; 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('map') mapElement;
    map: any;
  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad(){
    this.loadMap()
  }
  addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
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
       let content = "<h4>hello I am here :)</h4>";          
 
      this.addInfoWindow(marker, content);
 
 
    }, (err) => {
      console.log(err);
    });
 
  }
 
}