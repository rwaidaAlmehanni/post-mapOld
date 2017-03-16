import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 
    cards: any;
    category: string = 'gear';
 
    constructor(public navCtrl: NavController) {
 
        this.cards = [];
      firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {
        
      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;

        this.cards.push(element);
      })
    })
 
   }
}