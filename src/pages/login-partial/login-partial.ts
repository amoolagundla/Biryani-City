import {
    
    Events
} from 'ionic-angular';
import {
    Component
} from '@angular/core';
import {
    NavController
} from 'ionic-angular';
import {
    HomePage
} from "../home/home";
import {
    AuthenticationService
} from "../../services/login-service";
import {
    ValuesService
} from "../../services/ValuesService";
import {
    LoadingController
} from 'ionic-angular';
import {
    AlertController
    
} from 'ionic-angular';
import {
    RegisterPage
} from "../register/register";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import {
    Storage
} from '@ionic/storage';

import {
  
    NativeStorage
  
    
} from 'ionic-native';
import {
    Push,
    PushToken
} from '@ionic/cloud-angular';
import { ModalController } from 'ionic-angular';
import {

    LocalNotifications
    

} from 'ionic-native';

import { SharedDataService } from '../../services/sharedDataService';
import{ResetEmailPage} from '../../pages/reset-email/reset-email';
/*
  Generated class for the LoginPartial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-partial',
  templateUrl: 'login-partial.html'
})
export class LoginPartialPage {

    /*private oauth: OauthCordova = new OauthCordova();
        private facebookProvider: Facebook = new Facebook({
          clientId: "172669669872080",
          appScope: ["email"]
        })*/

    public username: string = '';
    public token: string;
  
    public loading: any = this.loadingCtrl.create({
        content: "Please wait...",
        dismissOnPageChange: true
    });
  
    public password: string = '';
    constructor(public nav: NavController,
        private authenticationService: AuthenticationService,
        public loadingCtrl: LoadingController,
        public valuesService: ValuesService,
        public alertCtrl: AlertController, 
         public storage: Storage, 
          public push: Push,
           public events: Events,public modalCtrl: ModalController,
            public _SharedDataService: SharedDataService) {
        

    
        
        
    }
         
    // go to register page
    register() {
        this.nav.setRoot(RegisterPage);
    }
    // login and go to home page
    login() {

        this.loading.present();
        this.authenticationService.login(this.username, this.password)
            .subscribe(
                data => {

                    this.storage.remove('currentUser');
                    this.storage.remove('userName');
                 
                    this.storage.set('currentUser', data.access_token).then(() => {


                        this.getUserInfo();

                    }, error => {
console.log(error);
                    });

                },
                error => {
                    this.loading.dismiss();
                 let er =error.json();
				  let alert = this.alertCtrl.create({
    title: 'Login Error ',
    subTitle: er.error_description,
    buttons: ['Dismiss']
  });
  alert.present();
  this.nav.setRoot(LoginPartialPage);
                });

    }



  getUserInfo()  {
        this.valuesService.getAll()
            .subscribe(
                data => {
                        
                    this.storage.set('UserInfo', JSON.stringify(data)).then(() => {
                     //   this.getCatogories();
                        NativeStorage.remove('at');
                        this.loading.dismiss();
                        this.registerPushToken();
                           this.nav.setRoot(HomePage,{ email: data.Email});
				 
                      

                       
                    
                    }, error => {

                    });

                },
                error => {
                    console.log(error);
                    this.loading.dismiss();

                });

    }
registerPushToken()
{
     this.push.unregister();
    this.push.register().then((t: PushToken) => {
  return this.push.saveToken(t);
}).then((t: PushToken) => {
     this.valuesService.SaveToken(t.token).subscribe(()=>
  {
  },err=>
  {
      console.log(err); 
  });
});

this.push.rx.notification()
  .subscribe((msg) => {
   
    let ms =msg;
   LocalNotifications.schedule({
                    id: 1,
                    title: ms.title,
                    text: ms.text,
                    icon: 'res://icon.png',
                    smallIcon:'file:res//icon.png'
                });
  
  });
}


openPasssword()
{ 
    let modal = this.modalCtrl.create(ResetEmailPage, {"resetEmail": true});
              modal.present();
}
verifyCodePasssword()
{
    let modal = this.modalCtrl.create(ResetEmailPage, {"resetEmail": false});
              modal.present();
}
}
