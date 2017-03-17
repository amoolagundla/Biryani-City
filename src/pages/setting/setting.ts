import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ValuesService } from '../../services/ValuesService';
import {

  NativeStorage




} from 'ionic-native';
import { Events } from 'ionic-angular';

import {  UserInfo } from '../../app/app.module';
import { SharedDataService } from '../../services/sharedDataService';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  public url: string = 'assets/img/4.jpg';
  public name: string = '';
  public userInfo: UserInfo= new UserInfo();
 
  constructor(public nav: NavController, public valService: ValuesService, public events: Events,
    public _SharedDataService: SharedDataService) {


    this._SharedDataService.UserInfo.subscribe((data) => {

      this.userInfo = data;
       console.log(this.userInfo);
    });   
    NativeStorage.getItem('userDetails').then((data) => {
      this.url = data.url;
      this.name = data.name;

    }, err => {

      });

    this.events.subscribe('UpdatePic', (data) => {

      this.url = data.url;
    });

  }

  saveProfile() {
   
    this.valService.UpdateProfile(this.userInfo).subscribe(
      data => {
      
        this.valService.UpdateUserInfo(this.userInfo);
        localStorage.setItem('UserInfo', JSON.stringify(this.userInfo));
        this.nav.pop();
        this.nav.setRoot(SettingPage);
      },
      error => {
       
        this.nav.pop(); 
        this.nav.setRoot(SettingPage);
      });
  }
}
