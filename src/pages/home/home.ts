import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private nickValidate: boolean = false;


  private nickColor = {
    "white": "Mr.White",
    "orange": "Mr.Orange",
    "yellow": "Mr.Blonde",
    "pink": "Mr.Pink",
    "blue": "Mr.Blue",
    "brown": "Mr.Brown"
  }


  constructor(public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController) {

  }


  chooseColor(color): any {
    let nick = this.nickColor[color];

    this.storage.set("personNick", nick).then(res => {
      this.nickValidate = true
      this.showColorChooseAlert(nick);
    });
    this.storage.set("personColor", color);
    
  }

  goToNextpage() {
    if(!this.nickValidate) {
      this.showAlertValidationError();
      return false;
    }

    this.navCtrl.pop();
  }


  showAlertValidationError() {
    this.buildAlert("ValidationError", "Please? Choose your color");
  }

  showColorChooseAlert(nick: string) {
    this.buildAlert(`Hi, ${nick}`, "Please? Come in");
  }

  buildAlert(title: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: ['Ok']
    });

    alert.present();
  }
}
