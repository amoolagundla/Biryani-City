import { Component } from '@angular/core';
import {
  NavController, NavParams, ViewController
} from 'ionic-angular';
import {
  ValuesService
} from '../../services/ValuesService';
import {
  LoadingController
} from 'ionic-angular';
import {
  AlertController

} from 'ionic-angular';
/*
  Generated class for the ResetEmail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-email',
  templateUrl: 'reset-email.html'
})
export class ResetEmailPage {
  public resetEmail: boolean = false;
  public username: any;
  public number: any;
  public code: any;
  public email: any;
  public newPassword: any;
  public confirmPassword: any;
  public loading: any = this.loadingCtrl.create({
    content: "Please wait...",
    dismissOnPageChange: true
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public valService: ValuesService, public viewCtrl: ViewController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.resetEmail = this.navParams.get('resetEmail');

  }

  ionViewDidLoad() {

  }

  SendEmail() {
    if (this.number !== null && this.number !== undefined && this.username !== null && this.username !== undefined) {
      this.loading.present();
      this.valService.ResendEmail(this.username, this.number).subscribe(data => {

        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Reset Password',
          subTitle: "Please wait to get your verification Code",
          buttons: ['OK']
        });
        alert.present();
      }, err => 
      {
          this.loading.dismiss();

          let alert = this.alertCtrl.create({
            title: 'Login Error ',
            subTitle: err.json(),
            buttons: ['Dismiss']
          });
          alert.present();
        });
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  verify() {
    this.confirmPassword = this.newPassword;
    this.loading.present();
    this.valService.ResetPassword(this.code, this.email, this.newPassword, this.confirmPassword).subscribe((data) => 
    {

      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Reset Password',
        subTitle: "Your password has been reset.",
        buttons: ['OK']
      }); 
      alert.present();
    }, err => 
    {
        this.loading.dismiss();
      
      });
  }
}
