import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'comments.html',
})
export class CommentsPage {

  comments: any[] = [];
  newComment: any = {};

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams
  ) {
    this.comments = this.params.get('comments');
  }

  close(){
    this.viewCtrl.dismiss();
  }

  addComment(){
    this.newComment.user = {
      "username": "nicobytes",
      "avatar": "images/nicobytes.jpg"
    }
    this.comments.push( this.newComment );
    this.newComment = {};
  }

}
