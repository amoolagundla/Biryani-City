import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ValuesService} from '../../services/ValuesService';
import { LoadingController } from 'ionic-angular';
import {
    
    NativeStorage
    
    
     
    
} from 'ionic-native';
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
	public url:string='';
public name:string='';
  public UserInfo:any;
	public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
  constructor(public nav: NavController,public valService:ValuesService,	public loadingCtrl: LoadingController) {
			console.log(this.valService.UserInfo);
			this.UserInfo = this.valService.getUserInfo();
			 NativeStorage.getItem('userDetails').then((data) =>
   {
      this.url=data.url;
      this.name=data.name;

   },err=>
   {

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
