import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
arr
x
  constructor(public navCtrl: NavController) {
  		this.x=[]
      this.arr=[];
  let database=firebase.database().ref();
  let users=firebase.database().ref().child("userProfile");
  users.on("child_added",snap=>{
  this.arr.push(snap.val());
  });
 
  }
  addFriend(email){
  	let database=firebase.database().ref();
  let friends=database.child("userProfile").child(firebase.auth().currentUser.uid).child("friends");

  	for(let user of this.arr){
  		if(email===user.email){
  		if(user.uid!==firebase.auth().currentUser.uid){
  	friends.child(user.uid).set(user.uid)
  	database.child("userProfile").child(user.uid).child("friends").child(firebase.auth().currentUser.uid).set(firebase.auth().currentUser.uid);
  }


  		}
  		
  	}
  	
  }


}
