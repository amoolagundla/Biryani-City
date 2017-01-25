import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import{SettingPage} from '../../pages/setting/setting';
import {AddressPage} from '../../pages/address/address';
import {ChangePasswordPage} from '../../pages/change-password/change-password';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
// this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SettingPage;
  tab2Root: any = AddressPage;
	tab3Root:any=    ChangePasswordPage; 
  constructor(public nav: NavController) {
	  

  }
}
