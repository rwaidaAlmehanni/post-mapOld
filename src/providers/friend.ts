import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Friend provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Friend {
  public currentUser: string;
  public friendList: firebase.database.Reference;

  constructor(public http: Http) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.friendList = firebase.database()
        .ref(`userProfile/${this.currentUser}/friendList`);

  }
  createFriend(friendName: string): firebase.Promise<any> {
  return this.friendList.push({
    name: friendName
    
  });
}
getFriendList(): firebase.database.Reference {
  return this.friendList;
}
}
