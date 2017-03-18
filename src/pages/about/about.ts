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
    obj:any;
    cards: any;
    category: string = 'gear';
   // tab1Root: any = HomePage;
    likesNum:any;
 
    constructor(public navCtrl: NavController , private modalCrtl: ModalController) {
         this.obj={};
        this.cards = [];
        this.likesNum=0;

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
     this.obj[firebase.auth().currentUser.uid.slice(-10)]=1;
     this.likesNum=Object.keys(this.obj).length;
     console.log(this.likesNum)
    firebase.database().ref('assets').child(item.id).child("likes").push(this.obj);
  }
  showComments(item: any): void{
    let modal = this.modalCrtl.create(CommentsPage,{
      comments: [item.id]
    });
    modal.present();
  }
 

}