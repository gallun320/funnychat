import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

@Component({
    selector: "page-chat",
    templateUrl: 'chat.html'
})
export class ChatPage implements OnInit {
    private personNick: string;
    private personColor: string;
    private model: any = {};
    private listMesages: object[];
    private ref = firebase.database().ref("/funnychat/get");

    constructor(private storage: Storage, private nav: NavController) {
        this.personNick = "";
        this.personColor = "white";
    }

    ngOnInit() {
        
        this.ref.on("value", res => {
            let tmp = [];
            
            res.forEach(snp => {
                let data: any = snp.toJSON();
                tmp.push({ msg: data.msg, nick: data.personNick, color: data.personColor })
            });

            this.listMesages = tmp;
        });
        this.storage.get("personNick").then(res => this.setPersonNickName(res));
        console.log(this.listMesages);
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

        this.ref.push({ msg: this.model.msg, nick: this.personNick, color: this.personColor })
        
        this.model.msg = "";
    }
}