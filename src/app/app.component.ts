import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";

var config = {
      apiKey: "AIzaSyBysr3dYp02zQtMf8ZqMkA4xcjSpGKw9yY",
      authDomain: "fynnychat.firebaseapp.com",
      databaseURL: "https://fynnychat.firebaseio.com",
      projectId: "fynnychat",
      storageBucket: "fynnychat.appspot.com",
      messagingSenderId: "399911137193"
    };

import { ChatPage } from '../pages/chat/chat';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ChatPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

