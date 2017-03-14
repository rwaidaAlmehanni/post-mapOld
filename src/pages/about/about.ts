import { Component,Pipe, PipeTransform, Injectable} from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
@Injectable()
@Pipe({
  name: 'objectEmails'
})
export class AboutPage implements PipeTransform {
	assetCollection;
constructor(public navCtrl: NavController ) {
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

     this.assetCollection =  result ;

  });
}

  transform() {
    let result = [];
    for (let i of this.assetCollection) {
        result.push(this.assetCollection[i]["email"]);
      }
   
    return result;
  }
}
