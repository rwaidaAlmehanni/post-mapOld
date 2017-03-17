import { Component } from '@angular/core';
import { NavController , ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CommentsPage } from '../comments/comments';
import { HomePage } from '../home/home';

 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 
    cards: any;
    category: string = 'gear';
    tab1Root: any = HomePage;
 
    constructor(public navCtrl: NavController , private modalCrtl: ModalController) {
 
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
   like(item: any): void{
    ++item.likes;
  }
  showComments(item: any): void{
    let modal = this.modalCrtl.create(CommentsPage,{
      comments: [item.email]
    });
    modal.present();
  }
 

}