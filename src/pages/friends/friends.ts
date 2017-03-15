import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
    arr;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  friendsPosts() {
  	this.arr=[];
  let database=firebase.database().ref();
  let friends=database.child("userProfile").child(firebase.auth().currentUser.uid).child("friends");
   friends.on("child_added",snap=>{
  this.arr.push(snap.val());
  });
   console.log(this.arr);
 
  }

}
