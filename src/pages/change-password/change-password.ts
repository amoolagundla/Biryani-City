import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { ValuesService } from '../../services/ValuesService';
import { ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
	public user: any={
      OldPassword: '',
      Newpassword: '',
      confirmPassword: ''
    };
		public loading :any= this.loadingCtrl.create({
      content: "Please wait...",      
      dismissOnPageChange: true
    });
public OldPassword:string;
public Newpassword :string;
public confirmPassword :string;
   constructor(public nav: NavController,private valuesService:ValuesService,public toastCtrl: ToastController,public alertCtrl: AlertController,
		public loadingCtrl: LoadingController) {
	
  }

  ionViewDidLoad() {
    console.log('Hello ChangePasswordPage Page');
  }
 save(model: any, isValid: boolean,event:Event) {
    // call API to save customer
     event.preventDefault();
									
		if(isValid)
		{
			let ChangePasswordBindingModel=
			{
				OldPassword:model.OldPassword,
				NewPassword:model.Newpassword,
				ConfirmPassword:model.confirmPassword
			};
			console.log(ChangePasswordBindingModel);
			this.loading.present();
			this.valuesService.PostChangePassword(ChangePasswordBindingModel)
            .subscribe(
                data => {			
                         this.loading.dismiss();
												 
                },
								  error => {
                    this.loading.dismiss();
                 let er =error.json();
				  let alert = this.alertCtrl.create({
    title: 'Error ',
    subTitle: 'check your password',
    buttons: ['Dismiss']
  });
  alert.present();
  this.nav.setRoot(ChangePasswordPage);
                });
										 
		}
  }
}
