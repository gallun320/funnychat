import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
    selector: "page-chat",
    templateUrl: 'chat.html'
})
export class ChatPage implements OnInit {
    private personNick: string;
    private personColor: string;
    private model: any = {};
    private listMesages: object[] = [];

    constructor(private storage: Storage, private nav: NavController) {
        this.personNick = "";
        this.personColor = "white";
    }

    ngOnInit() {
        this.storage.get("personNick").then(res => this.setPersonNickName(res));
    }


    validateNickData(nick: string) {
        return (nick === null || nick === undefined || nick === "") ? false : true;
    }

    setPersonNickName(nick: string) {
        if(!this.validateNickData(nick)) this.nav.push(HomePage);

        this.personNick = nick;

        this.setPersonColor();
    }

    setPersonColor() {
        this.storage.get("personColor")
                    .then(res => this.personColor = res);
    }

    sendMessage() {
        this.listMesages.push({ msg: this.model.msg, nick: this.personNick, color: this.personColor });
        this.model.msg = "";
    }
}