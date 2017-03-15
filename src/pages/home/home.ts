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
    result:any;
    arr;
    likes;
    waleed=0;
  constructor(public navCtrl: NavController , public modalCtrl: ModalController , public authData:AuthData) {
  }
  ionViewDidLoad(){
    this.loadMap()

  }
  

// addLike(URL){
//   let database=firebase.database().ref();
//   database.child("assets").
// }
go(){
  console.log("ggggggg")
}
   addInfoWindow(marker, message) {
            let div ="<div>"
            let like=0;
           
            for(let i of message){
               let ref = firebase.database().ref('/assets');
               this.likes=ref.child(i.slice(-10)).child("likes")
               this.likes.on('value', function(snapshot) {
                 like= snapshot.val();
                 //console.log(like)
              });

              div+="<img src ="+i+"/>"
              div+="<br>"
              this.go();
              //console.log(like)
              div+="<button ion-button  onclick= \" console.log('go') \" >"+like+"</button>"
              div+="<button ion-button color='dark'>"+'comments'+"</button>"
              div+="<button ion-button color='dark'>"+'disLike'+"</button>"

            }

            let infoWindow = new google.maps.InfoWindow({

                content: div+"</div>"

            });
            google.maps.event.addListener(marker, 'click',  ()=> {

                infoWindow.open(this.map, marker);
            });
        
        }
 
 loadMap(){
   this.arr=[];
       this.result=[];
    // load data from firebase...
    firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;

        this.result.push(element);
      })
 Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
      for(let mark of this.result){
        this.arr=[]
            for(let image of this.result){

              if(image.latitude===mark.latitude&&image.longitude===mark.longitude){
                this.arr.push(image.URL)
              }
            }

             let marker = new google.maps.Marker({
                 map: this.map,
               animation: google.maps.Animation.DROP,
                position: {lat:mark.latitude,lng:mark.longitude}
                 });
              // adding ifoWindow ...          
      this.addInfoWindow(marker,this.arr);

              // adding ifoWindow ...
  
}   
    }, (err) => {
      console.log(err);
    });
  })
 
  }
//    goToCreate(){
//      let arr=[];
//   let database=firebase.database().ref();
//   database.child("userProfile").child(firebase.auth().currentUser.uid).child("friends").push({"a":"azoz"})
//   let users=firebase.database().ref().child("userProfile");
//   users.on("child_added",snap=>{
//   arr.push(snap.val());
//   });
//   console.log(arr);
// }
  logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}
 
}




