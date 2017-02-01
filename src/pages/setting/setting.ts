import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ValuesService} from '../../services/ValuesService';
import { LoadingController } from 'ionic-angular';
import {
    
    NativeStorage
    
    
     
    
} from 'ionic-native';
import { Events } from 'ionic-angular';
/* 
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
	public url:string='assets/img/4.jpg';
public name:string='';
  public UserInfo:any;
	public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
  constructor(public nav: NavController,public valService:ValuesService,	public loadingCtrl: LoadingController,public events:Events) {
			console.log(this.valService.UserInfo);
			this.UserInfo = this.valService.getUserInfo();
			 NativeStorage.getItem('userDetails').then((data) =>
   {
      this.url=data.url;
      this.name=data.name;

   },err=>
   {

   });

     this.events.subscribe('UpdatePic',(data) => {

         this.url=data.url;
});
         
  }
	
	saveProfile()
	{	this.loading.present();
		   this.valService.UpdateProfile(this.UserInfo).subscribe(
                data => {			
	                         this.loading.dismiss();								
		                       this.valService.UpdateUserInfo(this.UserInfo);
													 localStorage.setItem('UserInfo',JSON.stringify(this.UserInfo));
													 this.nav.pop();
													 this.nav.setRoot(SettingPage);
                }, 
                error => {
                  	            this.loading.dismiss();this.nav.pop();this.nav.setRoot(SettingPage);
                });		
	}
}
